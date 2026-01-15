import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text,
    Hr,
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
    customerName = 'Đồng nghiện',
    orderId = 'ABC12345',
    orderDate = new Date().toLocaleDateString('vi-VN'),
    orderItems = [],
    subtotal = 0,
    shippingFee = 0,
    totalAmount = 0,
    shippingAddress = '123 Đường Mây, Quận Gió',
    shippingCity = 'TP.HCM',
    shippingDistrict = '',
    paymentMethod = 'COD',
    shippingMethod = 'express',
}: OrderConfirmationEmailProps) => {
    const formatCurrency = (amount: number) => {
        return amount.toLocaleString('vi-VN') + '₫';
    };

    const paymentText = {
        cod: 'Tiền mặt (COD) - Nhận hàng trả tiền',
        qr: 'Chuyển khoản QR - Ting ting là xong',
        card: 'Thẻ tín dụng - Quẹt phát ăn ngay',
        wallet: 'Ví điện tử - 1 chạm là chốt',
    }[paymentMethod] || paymentMethod;

    return (
        <Html>
            <Head />
            <Preview>🍎 Đơn hàng #{orderId.slice(0, 8)} đã chốt! Chuẩn bị "hưởng thụ" thôi!</Preview>
            <Body style={main}>
                <Container style={container}>
                    {/* Header trái cây */}
                    <Section style={header}>
                        <div style={emojiLogo}>🍒</div>
                        <Heading style={brandTitle}>Tiệm Quả Nghiệp</Heading>
                        <Text style={slogan}>Nghiệp tụ vành môi - Ăn vô trôi hết</Text>
                    </Section>

                    {/* Hero Section hài hước */}
                    <Section style={heroSection}>
                        <Heading style={heroTitle}>Đã chốt đơn nha {customerName}! 🎉</Heading>
                        <Text style={heroText}>
                            Cảm ơn bạn đã dũng cảm ủng hộ Tiệm. Đội ngũ admin đang hì hục lựa những trái ngon nhất,
                            đóng gói cẩn thận (có kèm chút tình yêu) để gửi đến bạn shipper đẹp trai nhất khu vực! 🚀
                        </Text>
                    </Section>

                    {/* Card thông tin đơn hàng */}
                    <Section style={card}>
                        <div style={cardHeader}>🧾 Chi tiết "thiệt hại"</div>

                        {/* List sản phẩm */}
                        {orderItems.map((item, index) => (
                            <div key={index} style={itemRow}>
                                <div style={imgContainer}>
                                    {item.product_image ? (
                                        <Img
                                            src={item.product_image}
                                            alt={item.product_name}
                                            style={productImg}
                                        />
                                    ) : (
                                        <div style={placeholderImg}>🍎</div>
                                    )}
                                </div>
                                <div style={itemInfo}>
                                    <Text style={itemName}>{item.product_name}</Text>
                                    <Text style={itemMeta}>
                                        {item.quantity} {item.unit} x {formatCurrency(item.price)}
                                    </Text>
                                </div>
                                <div style={itemPrice}>
                                    {formatCurrency(item.price * item.quantity)}
                                </div>
                            </div>
                        ))}

                        <Hr style={divider} />

                        {/* Tổng tiền */}
                        <div style={totalRow}>
                            <Text style={totalLabel}>Tạm tính:</Text>
                            <Text style={totalValue}>{formatCurrency(subtotal)}</Text>
                        </div>
                        <div style={totalRow}>
                            <Text style={totalLabel}>Ship (nhẹ nhàng):</Text>
                            <Text style={totalValue}>{formatCurrency(shippingFee)}</Text>
                        </div>
                        <div style={grandTotalRow}>
                            <Text style={grandTotalLabel}>Tổng "thiệt hại":</Text>
                            <Text style={grandTotalValue}>{formatCurrency(totalAmount)}</Text>
                        </div>
                    </Section>

                    {/* Card giao hàng */}
                    <Section style={card}>
                        <div style={cardHeader}>🚚 Hàng về đâu?</div>
                        <Text style={infoText}>
                            <strong>📍 Người nhận:</strong> {customerName}
                        </Text>
                        <Text style={infoText}>
                            <strong>🏠 Địa chỉ:</strong> {shippingAddress}
                            {shippingDistrict && `, ${shippingDistrict}`}
                            {shippingCity && `, ${shippingCity}`}
                        </Text>
                        <Text style={infoText}>
                            <strong>💸 Thanh toán:</strong> {paymentText}
                        </Text>
                        <Text style={infoText}>
                            <strong>📅 Ngày đặt:</strong> {orderDate} (Mã: #{orderId.slice(0, 8)})
                        </Text>
                    </Section>

                    {/* CTA Buttons */}
                    <Section style={btnSection}>
                        <Button style={msgButton} href="http://localhost:3000/profile?tab=orders">
                            🔍 Soi hành trình đơn
                        </Button>
                        <Text style={secondaryAction}>
                            <Link href="http://localhost:3000/products" style={linkText}>
                                🛒 Vẫn chưa đã? Mua tiếp!
                            </Link>
                        </Text>
                    </Section>

                    {/* Footer Voucher */}
                    <Section style={voucherBox}>
                        <Text style={voucherText}>
                            🎁 <strong>Quà làm quen:</strong> Nhập mã <span style={codeBadge}>NGHIEP10</span> giảm 10% đơn sau nha!
                        </Text>
                    </Section>

                    {/* Footer Info */}
                    <Section style={footer}>
                        <Text style={footerHeading}>Cần ới tụi mình?</Text>
                        <Text style={footerContact}>
                            💌 <Link href="mailto:support@tiemquanghiep.com" style={contactLink}>support@tiemquanghiep.com</Link> •
                            📞 <Link href="tel:0909xxxxxx" style={contactLink}>0909.xxx.xxx</Link>
                        </Text>
                        <Text style={footerNote}>
                            © 2026 <strong>Tiệm Quả Nghiệp</strong>.<br />
                            Ăn trái cây - Sống healthy - Bớt thị phi.
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
};

export default OrderConfirmationEmail;

// ================= STYLES =================

const main = {
    backgroundColor: '#FFF5E6', // Màu kem nền nhẹ
    fontFamily: '"Nunito", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    padding: '10px',
};

const container = {
    backgroundColor: '#ffffff',
    margin: '0 auto',
    borderRadius: '16px',
    overflow: 'hidden',
    maxWidth: '600px',
    boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
    border: '2px solid #FFE4C4', // Viền cam nhạt
};

const header = {
    background: 'linear-gradient(135deg, #FF9966 0%, #FF5E62 100%)', // Gradient cam đỏ
    padding: '30px 20px',
    textAlign: 'center' as const,
};

const emojiLogo = {
    fontSize: '48px',
    marginBottom: '10px',
    filter: 'drop-shadow(0 4px 4px rgba(0,0,0,0.1))',
};

const brandTitle = {
    color: '#ffffff',
    fontSize: '28px',
    fontWeight: '800',
    margin: '0',
    textTransform: 'uppercase' as const,
    letterSpacing: '1px',
    textShadow: '2px 2px 0 rgba(0,0,0,0.1)',
};

const slogan = {
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: '600',
    margin: '5px 0 0 0',
    fontStyle: 'italic',
    opacity: 0.9,
};

const heroSection = {
    padding: '25px 25px 15px',
    textAlign: 'center' as const,
};

const heroTitle = {
    color: '#FF5E62',
    fontSize: '22px',
    fontWeight: 'bold',
    margin: '0 0 10px 0',
};

const heroText = {
    color: '#555',
    fontSize: '15px',
    lineHeight: '1.6',
    margin: '0',
};

const card = {
    backgroundColor: '#FAFAFA',
    borderRadius: '12px',
    padding: '20px',
    margin: '0 20px 20px',
    border: '1px dashed #ddd',
};

const cardHeader = {
    color: '#333',
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '15px',
    textTransform: 'uppercase' as const,
    borderBottom: '2px solid #FF9966',
    display: 'inline-block',
    paddingBottom: '5px',
};

const itemRow = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
};

const imgContainer = {
    marginRight: '15px',
};

const productImg = {
    width: '50px',
    height: '50px',
    borderRadius: '8px',
    objectFit: 'cover' as const,
    border: '1px solid #eee',
};

const placeholderImg = {
    width: '50px',
    height: '50px',
    borderRadius: '8px',
    backgroundColor: '#F0F0F0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
};

const itemInfo = {
    flex: 1,
};

const itemName = {
    color: '#333',
    fontSize: '14px',
    fontWeight: 'bold',
    margin: '0 0 4px 0',
};

const itemMeta = {
    color: '#888',
    fontSize: '12px',
    margin: '0',
};

const itemPrice = {
    color: '#333',
    fontSize: '14px',
    fontWeight: 'bold',
    whiteSpace: 'nowrap' as const,
};

const divider = {
    borderColor: '#eee',
    borderStyle: 'dashed',
    margin: '15px 0',
};

const totalRow = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '6px',
};

const totalLabel = {
    color: '#666',
    fontSize: '14px',
};

const totalValue = {
    color: '#333',
    fontSize: '14px',
    fontWeight: '600',
};

const grandTotalRow = {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '10px',
    paddingTop: '10px',
    borderTop: '1px solid #ddd',
};

const grandTotalLabel = {
    color: '#FF5E62',
    fontSize: '16px',
    fontWeight: 'bold',
};

const grandTotalValue = {
    color: '#FF5E62',
    fontSize: '18px',
    fontWeight: 'bold',
};

const infoText = {
    color: '#555',
    fontSize: '14px',
    marginBottom: '8px',
    lineHeight: '1.5',
};

const btnSection = {
    textAlign: 'center' as const,
    margin: '0 20px 20px',
};

const msgButton = {
    backgroundColor: '#4CDF20', // Xanh lá tươi
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: 'bold',
    padding: '14px 30px',
    borderRadius: '50px', // Bo tròn kiểu pill
    textDecoration: 'none',
    display: 'inline-block',
    boxShadow: '0 4px 0 #3cb018', // Hiệu ứng nổi
};

const secondaryAction = {
    marginTop: '15px',
    fontSize: '14px',
};

const linkText = {
    color: '#FF9966',
    textDecoration: 'none',
    fontWeight: 'bold',
};

const voucherBox = {
    backgroundColor: '#FFF0F5',
    margin: '0 20px 20px',
    padding: '12px',
    borderRadius: '8px',
    textAlign: 'center' as const,
    border: '1px dashed #FF69B4',
};

const voucherText = {
    color: '#D02090',
    fontSize: '14px',
    margin: '0',
};

const codeBadge = {
    backgroundColor: '#D02090',
    color: '#fff',
    padding: '2px 6px',
    borderRadius: '4px',
    fontWeight: 'bold',
    marginLeft: '4px',
};

const footer = {
    backgroundColor: '#F9F9F9',
    padding: '20px',
    textAlign: 'center' as const,
    borderTop: '1px solid #eee',
};

const footerHeading = {
    color: '#888',
    fontSize: '14px',
    fontWeight: 'bold',
    textTransform: 'uppercase' as const,
    margin: '0 0 10px 0',
};

const footerContact = {
    fontSize: '13px',
    color: '#666',
    margin: '0 0 15px 0',
};

const contactLink = {
    color: '#666',
    textDecoration: 'underline',
};

const footerNote = {
    fontSize: '12px',
    color: '#aaa',
    lineHeight: '1.5',
    margin: '0',
};
