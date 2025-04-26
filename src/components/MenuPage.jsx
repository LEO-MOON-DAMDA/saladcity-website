import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { createClient } from "@supabase/supabase-js"; 
import MenuSectionSlider from "./MenuSectionSlider";
import MenuCategoryNav from "./MenuCategoryNav";
import "./MenuPage.css";

// ✅ Supabase 연결 설정
const supabaseUrl = "https://bjcetaznlmqgjvozeeen.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqY2V0YXpubG1xZ2p2b3plZWVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ1MzI1MjksImV4cCI6MjA2MDEwODUyOX0.5Y86eiA_14SibBxOHjVU8p60lvPjj5BBT2WhQrd_5oE"; 
const supabase = createClient(supabaseUrl, supabaseKey);

export default function MenuPage() {
  const location = useLocation();
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      const { data, error } = await supabase.from("menu_items").select("*");
      if (error) {
        console.error("Supabase Fetch Error:", error.message);
      } else {
        setMenuItems(data || []);
      }
    };
    fetchMenuItems();
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

  return (
    <div className="menu-page">
      <div className="menu-background">
        <img src="https://bjcetaznlmqgjvozeeen.supabase.co/storage/v1/object/public/images/salad/salcy_menu04.webp" alt="kitchen background" />
      </div>

      <MenuCategoryNav />

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
