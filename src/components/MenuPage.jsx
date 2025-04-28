import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { supabaseMenu } from "../utils/supabaseMenuClient"; // ✅ 수정: 별도 클라이언트 import
import MenuSectionSlider from "./MenuSectionSlider";
import "./MenuPage.css";
import "./MenuCategoryNav.css";

export default function MenuPage() {
  const location = useLocation();
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showNav, setShowNav] = useState(true);

  useEffect(() => {
    const fetchMenuItems = async () => {
      const { data, error } = await supabaseMenu.from("menu_items").select("*");
      console.log("menu_items fetch 결과:", { data, error }); // ✅ 추가
      if (error) {
        console.error("Supabase Fetch Error:", error.message);
      } else {
        setMenuItems(data || []);
        const uniqueCategories = Array.from(new Set((data || []).map((item) => item.category))).filter(Boolean);
        setCategories(uniqueCategories);
      }
    };
    fetchMenuItems();
  }, []);

  useEffect(() => {
    let lastScrollTop = 0;
    const handleScroll = () => {
      const st = window.pageYOffset || document.documentElement.scrollTop;
      if (st > lastScrollTop) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }
      lastScrollTop = st <= 0 ? 0 : st;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (location.hash) {
      const sectionId = decodeURIComponent(location.hash.replace("#", ""));
      const el = document.getElementById(sectionId);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, [location]);

  const groupedItems = menuItems.reduce((acc, item) => {
    const section = item.category || "기타";
    if (!acc[section]) acc[section] = [];
    acc[section].push(item);
    return acc;
  }, {});

  const handleCategoryClick = (category) => {
    const el = document.getElementById(category);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="menu-page">
      <div className="menu-background">
        <img src="https://bjcetaznlmqgjvozeeen.supabase.co/storage/v1/object/public/images/salad/salcy_menu04.webp" alt="kitchen background" />
      </div>

      <nav className={`menu-category-nav ${showNav ? "show" : "hide"}`}>
        {categories.map((cat) => (
          <button key={cat} onClick={() => handleCategoryClick(cat)} className="menu-nav-btn">
            {cat}
          </button>
        ))}
      </nav>

      <div className="menu-content">
        {Object.entries(groupedItems).map(([section, items]) => (
          <div key={section} id={section}>
            <MenuSectionSlider title={section} items={items} />
          </div>
        ))}
      </div>
    </div>
  );
}
