import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Img,
    Preview,
    Section,
    Text,
    Hr,
    Link,
    Button,
} from '@react-email/components';
import * as React from 'react';

interface OrderItem {
    product_name: string;
    quantity: number;
    price: number;
    unit: string;
    product_image?: string;
}

interface OrderConfirmationEmailProps {
    customerName: string;
    orderId: string;
    orderDate: string;
    orderItems: OrderItem[];
    subtotal: number;
    shippingFee: number;
    totalAmount: number;
    shippingAddress: string;
    shippingCity?: string;
    shippingDistrict?: string;
    paymentMethod: string;
    shippingMethod: string;
}

export const OrderConfirmationEmail = ({
    customerName = 'Quý khách',
    orderId = 'ABC123',
    orderDate = new Date().toLocaleDateString('vi-VN'),
    orderItems = [],
    subtotal = 0,
    shippingFee = 0,
    totalAmount = 0,
    shippingAddress = '',
    shippingCity = '',
    shippingDistrict = '',
    paymentMethod = 'COD',
    shippingMethod = 'express',
}: OrderConfirmationEmailProps) => {
    const formatCurrency = (amount: number) => {
        return amount.toLocaleString('vi-VN') + '₫';
    };

    const getPaymentMethodText = (method: string) => {
        const methods: Record<string, string> = {
            cod: 'Tiền mặt (COD)',
            qr: 'Chuyển khoản QR',
            card: 'Thẻ tín dụng',
            wallet: 'Ví điện tử',
        };
        return methods[method] || method;
    };

    const getShippingMethodText = (method: string) => {
        const methods: Record<string, string> = {
            express: 'Giao hàng hỏa tốc (2H)',
            standard: 'Giao hàng tiêu chuẩn (2-3 ngày)',
        };
        return methods[method] || method;
    };

    return (
        <Html>
            <Head />
            <Preview>🎉 Đơn hàng #{orderId.slice(0, 8)} đã được xác nhận - Tiệm Qủa Nghiệp</Preview>
            <Body style={main}>
                <Container style={container}>
                    {/* Header with Enhanced Branding */}
                    <Section style={header}>
                        <div style={logoContainer}>
                            <div style={logoCircle}>🍎</div>
                        </div>
                        <Heading style={headerTitle}>Tiệm Quả Nghiệp</Heading>
                        <Text style={headerSubtitle}>Nghiệp tụ vành môi - Ăn vô trôi hết</Text>
                    </Section>

                    {/* Success Badge */}
                    <Section style={successBadge}>
                        <div style={badgeIcon}>✓</div>
                        <Heading style={successTitle}>Đặt Hàng Thành Công!</Heading>
                        <Text style={successText}>
                            Chào {customerName}, cảm ơn bạn đã tin tưởng Tiệm Quả Nghiệp!
                            Đơn hàng của bạn đang được xử lý.
                        </Text>
                    </Section>

                    {/* Order Timeline */}
                    <Section style={timelineSection}>
                        <div style={timelineContainer}>
                            <div style={timelineItem}>
                                <div style={{ ...timelineCircle, ...timelineCircleActive }}>✓</div>
                                <Text style={timelineText}>Đã đặt hàng</Text>
                            </div>
                            <div style={timelineLine}></div>
                            <div style={timelineItem}>
                                <div style={timelineCircle}>2</div>
                                <Text style={timelineText}>Đang xử lý</Text>
                            </div>
                            <div style={timelineLine}></div>
                            <div style={timelineItem}>
                                <div style={timelineCircle}>3</div>
                                <Text style={timelineText}>Đang giao</Text>
                            </div>
                            <div style={timelineLine}></div>
                            <div style={timelineItem}>
                                <div style={timelineCircle}>4</div>
                                <Text style={timelineText}>Hoàn thành</Text>
                            </div>
                        </div>
                    </Section>

                    {/* Order Info Card */}
                    <Section style={card}>
                        <table style={{ width: '100%' }}>
                            <tbody>
                                <tr>
                                    <td style={{ width: '50%', verticalAlign: 'top' }}>
                                        <Text style={label}>Mã đơn hàng</Text>
                                        <Text style={value}>#{orderId.slice(0, 8).toUpperCase()}</Text>
                                    </td>
                                    <td style={{ width: '50%', verticalAlign: 'top', textAlign: 'right' }}>
                                        <Text style={label}>Ngày đặt</Text>
                                        <Text style={value}>{orderDate}</Text>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </Section>

                    {/* Order Items with Images */}
                    <Section style={card}>
                        <Heading style={sectionHeading}>📦 Sản phẩm đã đặt</Heading>
                        {orderItems.map((item, index) => (
                            <div key={index}>
                                <table style={{ width: '100%', marginBottom: '20px' }}>
                                    <tbody>
                                        <tr>
                                            {item.product_image && (
                                                <td style={{ width: '80px', verticalAlign: 'top' }}>
                                                    <Img
                                                        src={item.product_image}
                                                        alt={item.product_name}
                                                        style={productImage}
                                                    />
                                                </td>
                                            )}
                                            <td style={{ verticalAlign: 'top', paddingLeft: item.product_image ? '16px' : '0' }}>
                                                <Text style={itemName}>{item.product_name}</Text>
                                                <Text style={itemDetails}>
                                                    Số lượng: {item.quantity} {item.unit} × {formatCurrency(item.price)}
                                                </Text>
                                            </td>
                                            <td style={{ verticalAlign: 'top', textAlign: 'right', whiteSpace: 'nowrap' }}>
                                                <Text style={itemTotal}>{formatCurrency(item.price * item.quantity)}</Text>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                {index < orderItems.length - 1 && <Hr style={itemDivider} />}
                            </div>
                        ))}

                        <Hr style={divider} />

                        {/* Totals */}
                        <table style={{ width: '100%' }}>
                            <tbody>
                                <tr>
                                    <td><Text style={totalLabel}>Tạm tính:</Text></td>
                                    <td style={{ textAlign: 'right' }}><Text style={totalValue}>{formatCurrency(subtotal)}</Text></td>
                                </tr>
                                <tr>
                                    <td><Text style={totalLabel}>Phí vận chuyển:</Text></td>
                                    <td style={{ textAlign: 'right' }}><Text style={totalValue}>{formatCurrency(shippingFee)}</Text></td>
                                </tr>
                            </tbody>
                        </table>

                        <div style={totalRowFinal}>
                            <table style={{ width: '100%' }}>
                                <tbody>
                                    <tr>
                                        <td><Text style={totalLabelFinal}>Tổng cộng:</Text></td>
                                        <td style={{ textAlign: 'right' }}><Text style={totalValueFinal}>{formatCurrency(totalAmount)}</Text></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </Section>

                    {/* Shipping Info */}
                    <Section style={card}>
                        <Heading style={sectionHeading}>🚚 Thông tin giao hàng</Heading>
                        <div style={infoRow}>
                            <Text style={infoLabel}>Địa chỉ:</Text>
                            <Text style={infoValue}>
                                {shippingAddress}
                                {shippingDistrict && `, ${shippingDistrict}`}
                                {shippingCity && `, ${shippingCity}`}
                            </Text>
                        </div>
                        <div style={infoRow}>
                            <Text style={infoLabel}>Vận chuyển:</Text>
                            <Text style={infoValue}>{getShippingMethodText(shippingMethod)}</Text>
                        </div>
                        <div style={infoRow}>
                            <Text style={infoLabel}>Thanh toán:</Text>
                            <Text style={infoValue}>{getPaymentMethodText(paymentMethod)}</Text>
                        </div>
                    </Section>

                    {/* CTA Buttons */}
                    <Section style={ctaSection}>
                        <table style={{ width: '100%', borderSpacing: '0 10px' }}>
                            <tbody>
                                <tr>
                                    <td style={{ padding: '0 5px' }}>
                                        <Button style={primaryButton} href="http://localhost:3000/profile">
                                            📍 Theo dõi đơn hàng
                                        </Button>
                                    </td>
                                    <td style={{ padding: '0 5px' }}>
                                        <Button style={secondaryButton} href="http://localhost:3000/products">
                                            🛒 Tiếp tục mua sắm
                                        </Button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </Section>

                    {/* Promo Banner */}
                    <Section style={promoBanner}>
                        <Text style={promoText}>
                            🎁 <strong>Ưu đãi đặc biệt!</strong> Nhập mã <span style={promoCode}>QUANGHIEP10</span> để giảm 10% cho đơn hàng tiếp theo
                        </Text>
                    </Section>

                    {/* Footer */}
                    <Section style={footer}>
                        <Text style={footerTitle}>Cần hỗ trợ?</Text>
                        <Text style={footerText}>
                            📧 Email: <Link href="mailto:support@tiemquanghiep.com" style={footerLink}>support@tiemquanghiep.com</Link><br />
                            📱 Hotline: <Link href="tel:1900xxxx" style={footerLink}>1900 xxxx</Link><br />
                            🏪 Địa chỉ: 123 Đường ABC, Quận XYZ, TP.HCM
                        </Text>

                        {/* Social Media */}
                        <div style={socialSection}>
                            <Text style={socialTitle}>Kết nối với chúng mình</Text>
                            <table style={{ margin: '0 auto' }}>
                                <tbody>
                                    <tr>
                                        <td style={{ padding: '0 8px' }}>
                                            <Link href="https://facebook.com" style={socialLink}>
                                                <div style={socialIcon}>f</div>
                                            </Link>
                                        </td>
                                        <td style={{ padding: '0 8px' }}>
                                            <Link href="https://instagram.com" style={socialLink}>
                                                <div style={socialIcon}>📷</div>
                                            </Link>
                                        </td>
                                        <td style={{ padding: '0 8px' }}>
                                            <Link href="https://zalo.me" style={socialLink}>
                                                <div style={socialIcon}>Z</div>
                                            </Link>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <Hr style={divider} />

                        <Text style={footerSmall}>
                            © 2026 Tiệm Quả Nghiệp. Trái cây tươi ngon, giao hàng tận nơi.<br />
                            Email này được gửi tự động, vui lòng không trả lời trực tiếp.
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
};

export default OrderConfirmationEmail;

// ========== STYLES ==========

const main = {
    backgroundColor: '#f0f4f8',
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
    padding: '20px 0',
};

const container = {
    backgroundColor: '#ffffff',
    margin: '0 auto',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
};

const header = {
    background: 'linear-gradient(135deg, #4CDF20 0%, #3ab818 100%)',
    padding: '40px 20px 30px',
    textAlign: 'center' as const,
    position: 'relative' as const,
};

const logoContainer = {
    marginBottom: '16px',
};

const logoCircle = {
    display: 'inline-block',
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    backgroundColor: '#ffffff',
    fontSize: '40px',
    lineHeight: '80px',
    textAlign: 'center' as const,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
};

const headerTitle = {
    color: '#ffffff',
    fontSize: '32px',
    fontWeight: 'bold',
    margin: '0',
    textShadow: '0 2px 4px rgba(0,0,0,0.1)',
    letterSpacing: '0.5px',
};

const headerSubtitle = {
    color: '#ffffff',
    fontSize: '14px',
    margin: '8px 0 0 0',
    fontWeight: '500',
    opacity: 0.95,
};

const successBadge = {
    padding: '30px',
    textAlign: 'center' as const,
    backgroundColor: '#f8fffe',
    borderBottom: '3px solid #4CDF20',
};

const badgeIcon = {
    display: 'inline-block',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: '#4CDF20',
    color: '#ffffff',
    fontSize: '32px',
    lineHeight: '60px',
    fontWeight: 'bold',
    marginBottom: '16px',
};

const successTitle = {
    color: '#0d160b',
    fontSize: '26px',
    fontWeight: 'bold',
    margin: '0 0 12px 0',
};

const successText = {
    color: '#525f7f',
    fontSize: '15px',
    lineHeight: '22px',
    margin: '0',
};

const timelineSection = {
    padding: '30px 20px',
    backgroundColor: '#fafbfc',
};

const timelineContainer = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '500px',
    margin: '0 auto',
};

const timelineItem = {
    textAlign: 'center' as const,
    flex: '0 0 auto',
};

const timelineCircle = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#e6ebf1',
    border: '3px solid #ffffff',
    color: '#8898aa',
    fontSize: '16px',
    fontWeight: 'bold',
    lineHeight: '34px',
    margin: '0 auto 8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
};

const timelineCircleActive = {
    backgroundColor: '#4CDF20',
    color: '#ffffff',
};

const timelineLine = {
    flex: '1',
    height: '3px',
    backgroundColor: '#e6ebf1',
    margin: '0 8px',
    position: 'relative' as const,
    top: '-25px',
};

const timelineText = {
    fontSize: '11px',
    color: '#8898aa',
    fontWeight: '600',
    margin: '0',
    textTransform: 'uppercase' as const,
};

const card = {
    backgroundColor: '#ffffff',
    border: '1px solid #e6ebf1',
    borderRadius: '12px',
    margin: '0 20px 16px 20px',
    padding: '28px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
};

const sectionHeading = {
    color: '#0d160b',
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '0 0 20px 0',
    borderBottom: '2px solid #f0f4f8',
    paddingBottom: '12px',
};

const label = {
    color: '#8898aa',
    fontSize: '11px',
    fontWeight: '700',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
    margin: '0 0 6px 0',
};

const value = {
    color: '#0d160b',
    fontSize: '16px',
    fontWeight: '600',
    margin: '0',
};

const productImage = {
    width: '80px',
    height: '80px',
    borderRadius: '8px',
    objectFit: 'cover' as const,
    border: '1px solid #e6ebf1',
};

const itemName = {
    color: '#0d160b',
    fontSize: '15px',
    fontWeight: '600',
    margin: '0 0 6px 0',
    lineHeight: '20px',
};

const itemDetails = {
    color: '#8898aa',
    fontSize: '13px',
    margin: '0',
    lineHeight: '18px',
};

const itemTotal = {
    color: '#0d160b',
    fontSize: '16px',
    fontWeight: 'bold',
    margin: '0',
};

const itemDivider = {
    borderColor: '#f6f9fc',
    margin: '16px 0',
};

const divider = {
    borderColor: '#e6ebf1',
    margin: '20px 0',
};

const totalLabel = {
    color: '#525f7f',
    fontSize: '14px',
    margin: '8px 0',
    lineHeight: '20px',
};

const totalValue = {
    color: '#0d160b',
    fontSize: '14px',
    fontWeight: '600',
    margin: '8px 0',
    lineHeight: '20px',
};

const totalRowFinal = {
    marginTop: '16px',
    paddingTop: '16px',
    borderTop: '2px solid #4CDF20',
    backgroundColor: '#f8fffe',
    padding: '16px',
    borderRadius: '8px',
};

const totalLabelFinal = {
    color: '#0d160b',
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '0',
};

const totalValueFinal = {
    color: '#4CDF20',
    fontSize: '26px',
    fontWeight: 'bold',
    margin: '0',
};

const infoRow = {
    marginBottom: '12px',
    display: 'table',
    width: '100%',
};

const infoLabel = {
    color: '#8898aa',
    fontSize: '13px',
    fontWeight: '600',
    margin: '0',
    display: 'table-cell',
    width: '110px',
    verticalAlign: 'top',
};

const infoValue = {
    color: '#0d160b',
    fontSize: '14px',
    margin: '0',
    display: 'table-cell',
    lineHeight: '20px',
};

const ctaSection = {
    padding: '20px 20px 10px',
};

const primaryButton = {
    backgroundColor: '#4CDF20',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: 'bold',
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'block',
    padding: '14px 20px',
    width: '100%',
    boxShadow: '0 2px 4px rgba(76, 223, 32, 0.3)',
};

const secondaryButton = {
    backgroundColor: '#ffffff',
    border: '2px solid #4CDF20',
    borderRadius: '8px',
    color: '#4CDF20',
    fontSize: '14px',
    fontWeight: 'bold',
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'block',
    padding: '12px 20px',
    width: '100%',
};

const promoBanner = {
    backgroundColor: 'linear-gradient(135deg, #FFA500 0%, #ff8c00 100%)',
    background: '#FFF3E0',
    border: '2px dashed #FFA500',
    borderRadius: '8px',
    padding: '16px',
    margin: '20px 20px 30px',
    textAlign: 'center' as const,
};

const promoText = {
    color: '#0d160b',
    fontSize: '14px',
    margin: '0',
    lineHeight: '20px',
};

const promoCode = {
    backgroundColor: '#FFA500',
    color: '#ffffff',
    padding: '4px 12px',
    borderRadius: '4px',
    fontWeight: 'bold',
    fontSize: '15px',
    letterSpacing: '1px',
};

const footer = {
    padding: '40px 30px 30px',
    textAlign: 'center' as const,
    backgroundColor: '#fafbfc',
    borderTop: '1px solid #e6ebf1',
};

const footerTitle = {
    color: '#0d160b',
    fontSize: '16px',
    fontWeight: 'bold',
    margin: '0 0 16px 0',
};

const footerText = {
    color: '#8898aa',
    fontSize: '14px',
    lineHeight: '22px',
    margin: '0 0 20px 0',
};

const footerLink = {
    color: '#4CDF20',
    textDecoration: 'none',
    fontWeight: '600',
};

const socialSection = {
    margin: '30px 0 20px',
};

const socialTitle = {
    color: '#525f7f',
    fontSize: '13px',
    fontWeight: '600',
    margin: '0 0 12px 0',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
};

const socialLink = {
    textDecoration: 'none',
};

const socialIcon = {
    display: 'inline-block',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#4CDF20',
    color: '#ffffff',
    fontSize: '18px',
    lineHeight: '40px',
    textAlign: 'center' as const,
    fontWeight: 'bold',
    transition: 'transform 0.2s',
};

const footerSmall = {
    color: '#aab7c4',
    fontSize: '12px',
    margin: '16px 0 0 0',
    lineHeight: '18px',
};
