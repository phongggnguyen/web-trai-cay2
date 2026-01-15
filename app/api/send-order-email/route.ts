import { NextRequest, NextResponse } from 'next/server';
import { resend } from '@/lib/resend';
import { supabase } from '@/lib/supabase';
import { OrderConfirmationEmail } from '@/emails/OrderConfirmation';
import { render } from '@react-email/render';

export async function POST(req: NextRequest) {
    try {
        const { orderId } = await req.json();

        if (!orderId) {
            return NextResponse.json(
                { error: 'Order ID is required' },
                { status: 400 }
            );
        }

        // 1. Fetch order from database
        const { data: order, error: orderError } = await supabase
            .from('orders')
            .select('*')
            .eq('id', orderId)
            .single();

        if (orderError || !order) {
            console.error('Order not found:', orderError);
            return NextResponse.json(
                { error: 'Order not found' },
                { status: 404 }
            );
        }

        // 2. Check if customer has email
        if (!order.customer_email || !order.customer_email.trim()) {
            return NextResponse.json(
                { error: 'No email address provided for this order' },
                { status: 400 }
            );
        }

        // 3. Fetch order items
        const { data: items, error: itemsError } = await supabase
            .from('order_items')
            .select('product_name, quantity, price, unit, product_image')
            .eq('order_id', orderId);

        if (itemsError) {
            console.error('Error fetching order items:', itemsError);
            return NextResponse.json(
                { error: 'Failed to fetch order items' },
                { status: 500 }
            );
        }

        // 4. Calculate subtotal
        const subtotal = (items || []).reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );

        // 5. Prepare email data
        const emailData = {
            customerName: order.customer_name,
            orderId: order.id,
            orderDate: new Date(order.created_at).toLocaleDateString('vi-VN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            }),
            orderItems: items || [],
            subtotal: subtotal,
            shippingFee: Number(order.shipping_fee),
            totalAmount: Number(order.total_amount),
            shippingAddress: order.shipping_address,
            shippingCity: order.shipping_city,
            shippingDistrict: order.shipping_district,
            paymentMethod: order.payment_method,
            shippingMethod: order.shipping_method,
        };

        // 6. Send email using Resend
        const { data: emailResult, error: emailError } = await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
            to: order.customer_email,
            subject: `[Tiệm Quả Nghiệp] Xác nhận đơn hàng #${orderId.slice(0, 8)}`,
            react: OrderConfirmationEmail(emailData),
        });

        if (emailError) {
            console.error('Failed to send email:', emailError);
            return NextResponse.json(
                { error: 'Failed to send email', details: emailError },
                { status: 500 }
            );
        }

        console.log('✅ Email sent successfully:', emailResult);

        return NextResponse.json({
            success: true,
            message: 'Email sent successfully',
            emailId: emailResult?.id,
        });

    } catch (error: any) {
        console.error('Unexpected error in send-order-email:', error);
        return NextResponse.json(
            { error: 'Internal server error', details: error.message },
            { status: 500 }
        );
    }
}
