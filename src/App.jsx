import React from "react";
import { Card, CardContent } from "./components/ui/card";
import { Instagram } from "lucide-react";

const menuItems = [
  {
    name: "수비드 돈목살 샐러드",
    price: "₩11,900",
    image: "/images/샐러드돈목살01.jpg",
    description: "부드럽게 조리된 돈목살과 신선한 채소의 조화"
  },
  {
    name: "로스트 베지 샐러드",
    price: "₩10,500",
    image: "/images/샐러드로스트베지01.jpg",
    description: "다양한 구운 야채와 렌틸콩, 고소한 드레싱"
  },
  {
    name: "머쉬룸 샐러드",
    price: "₩10,900",
    image: "/images/샐러드머쉬룸01.jpg",
    description: "버섯과 아보카도가 어우러진 담백한 샐러드"
  },
  {
    name: "버섯 불고기 샐러드",
    price: "₩12,000",
    image: "/images/샐러드버섯불고기01.jpg",
    description: "단짠 버섯 불고기와 신선 채소의 푸짐한 구성"
  },
  {
    name: "비프 스테이크 샐러드",
    price: "₩13,500",
    image: "/images/샐러드스테이크01.jpg",
    description: "소고기 스테이크와 곡물, 채소의 든든한 한 끼"
  },
  {
    name: "갈릭 오리 마늘 샐러드",
    price: "₩12,900",
    image: "/images/샐러드오리마늘01.jpg",
    description: "훈제오리와 구운 마늘, 고소한 토핑의 조화"
  }
];

export default function SaladcityHome() {
  return (
    <div className="min-h-screen bg-[#f9fafb] text-[#1a1a1a] font-sans">
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
        <div className="flex items-center gap-3">
          <img src="/images/saladcity_origin.png" alt="Saladcity Logo" className="h-8" />
          <span className="text-xl font-semibold">샐러드시티</span>
        </div>
        <nav className="hidden md:flex gap-5 text-sm">
          <a href="#menu" className="hover:underline">메뉴</a>
          <a href="#shop" className="hover:underline">굿즈</a>
          <a href="#subscribe" className="hover:underline">정기식</a>
          <a href="#locations" className="hover:underline">매장</a>
          <a href="https://www.instagram.com/saladcity_global" target="_blank" rel="noreferrer">
            <Instagram className="w-5 h-5" />
          </a>
        </nav>
      </header>

      <section className="text-center py-16 px-6 bg-gradient-to-b from-[#e0f3e5] to-[#ffffff]">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">건강하고 맛있는 샐러드</h1>
        <p className="text-lg text-gray-600">매일 새롭게, 신선하게. 샐러드시티와 함께하는 식단.</p>
      </section>

      <section id="menu" className="py-12 px-6 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-center">메뉴 소개</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems.map((item, index) => (
            <Card key={index} className="rounded-xl overflow-hidden border bg-white">
              <img src={item.image} alt={item.name} className="w-full h-60 object-cover" />
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                <span className="text-base font-bold">{item.price}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <footer className="text-center py-8 border-t text-sm text-gray-500 bg-white mt-16">
        <p>#Saladcity_Global</p>
        <p>© 2025 Saladcity. All rights reserved.</p>
      </footer>
    </div>
  );
}

