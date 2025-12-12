import React from 'react';

export default function AboutPage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative flex min-h-[400px] items-center justify-center bg-black/50 py-20 text-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=2070&auto=format&fit=crop" 
            alt="Farm" 
            className="h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background-light/0 to-background-light dark:to-background-dark"></div>
        </div>
        <div className="relative z-10 max-w-3xl px-4">
          <span className="mb-4 inline-block rounded-full bg-primary/20 px-4 py-1.5 text-sm font-bold text-primary backdrop-blur-sm">
            Since 2024
          </span>
          <h1 className="mb-6 text-4xl font-black text-text-main dark:text-white md:text-6xl">Câu Chuyện Của Tiệm</h1>
          <p className="text-lg font-medium text-gray-200 md:text-xl">
            Xuất phát từ một câu nói vui "Nghiệp tụ vành môi", chúng tôi tin rằng ăn uống không chỉ là nhu cầu, mà là một cách để chữa lành tâm hồn và kết nối mọi người.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="px-4 py-16 md:px-10">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-square overflow-hidden rounded-[2rem] lg:aspect-[4/3]">
            <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974&auto=format&fit=crop" className="h-full w-full object-cover" alt="Fruit Stall" />
            <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-primary blur-3xl opacity-50"></div>
          </div>
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl font-black text-text-main dark:text-white md:text-4xl">Sứ Mệnh "Giải Nghiệp"</h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed">
              Tại Tiệm Quả Nghiệp, chúng tôi không bán trái cây. Chúng tôi bán sự tươi mới, niềm vui và sức khỏe. Mỗi quả táo, chùm nho đều được tuyển chọn kỹ lưỡng từ những nông trại xanh sạch nhất.
            </p>
            <ul className="space-y-4">
              {[
                { title: 'Chất lượng hàng đầu', desc: 'Kiểm định 3 lớp trước khi đến tay khách hàng.' },
                { title: 'Nguồn gốc minh bạch', desc: 'Có mã QR truy xuất nguồn gốc từng loại quả.' },
                { title: 'Dịch vụ tận tâm', desc: 'Tư vấn như người nhà, giao hàng như người yêu.' },
              ].map((item, idx) => (
                <li key={idx} className="flex gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                    <span className="material-symbols-outlined">check</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-text-main dark:text-white">{item.title}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary px-4 py-16 text-text-main">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-8 text-center md:grid-cols-4">
          {[
            { num: '50+', label: 'Đối tác nông trại' },
            { num: '10k+', label: 'Khách hàng hạnh phúc' },
            { num: '100%', label: 'Trái cây tươi sạch' },
            { num: '24/7', label: 'Hỗ trợ nhiệt tình' },
          ].map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <span className="text-4xl font-black md:text-5xl">{stat.num}</span>
              <span className="mt-2 text-sm font-bold uppercase tracking-wider opacity-80">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="px-4 py-16 md:px-10">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-12 text-center">
             <h2 className="text-3xl font-black text-text-main dark:text-white md:text-4xl">Đội Ngũ "Chủ Vựa"</h2>
             <p className="mt-4 text-gray-500">Những gương mặt vàng trong làng chọn quả</p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
             {[
               { name: 'Nguyễn Văn Táo', role: 'Founder & CEO', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop' },
               { name: 'Trần Thị Mít', role: 'Chuyên gia Nông nghiệp', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop' },
               { name: 'Lê Văn Sầu', role: 'Trưởng phòng CSKH', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop' },
             ].map((member, idx) => (
               <div key={idx} className="group relative overflow-hidden rounded-2xl bg-surface-light dark:bg-surface-dark">
                 <div className="aspect-[3/4] overflow-hidden grayscale transition-all duration-500 group-hover:grayscale-0">
                   <img src={member.img} alt={member.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                 </div>
                 <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                   <h3 className="text-xl font-bold">{member.name}</h3>
                   <p className="text-sm font-medium text-primary">{member.role}</p>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </section>
    </div>
  );
}