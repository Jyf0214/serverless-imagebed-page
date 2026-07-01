"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Button, Tag, Space, Typography } from "antd";
import {
  PictureOutlined,
  FileTextOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { useLocale } from "@/i18n/useLocale";

const { Title, Text } = Typography;

const DEFAULT_BG = "https://bing.img.run/m.php";

export default function Home() {
  const { t } = useLocale();
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString("zh-CN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ position: "relative", height: "100vh", width: "100%", overflow: "hidden" }}>
      <Image src={DEFAULT_BG} alt="" fill unoptimized style={{ objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)" }} />

      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          height: "100%",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "#fff",
        }}
      >
        <Title
          level={1}
          style={{
            color: "#fff",
            fontSize: 56,
            fontWeight: 700,
            margin: 0,
            textShadow: "0 2px 12px rgba(0,0,0,0.3)",
          }}
        >
          {t.title}
        </Title>

        <Text
          style={{
            color: "rgba(255,255,255,0.85)",
            fontSize: 20,
            marginTop: 12,
            fontWeight: 300,
            letterSpacing: 2,
          }}
        >
          {t.subtitle}
        </Text>

        <Space style={{ marginTop: 32 }} size="middle">
          <Tag icon={<ClockCircleOutlined />} color="success" style={{ fontSize: 14, padding: "4px 12px" }}>
            {t.status}
          </Tag>
          <Tag style={{ fontSize: 14, padding: "4px 12px", background: "rgba(255,255,255,0.15)", border: "none", color: "#fff" }}>
            {time}
          </Tag>
        </Space>

        <Space style={{ marginTop: 32 }} size="middle">
          <Button
            shape="round"
            size="large"
            icon={<PictureOutlined />}
            href="/gallery"
            style={{ borderColor: "rgba(255,255,255,0.4)", color: "#fff", background: "rgba(255,255,255,0.1)" }}
          >
            {t.viewAll}
          </Button>
          <Button
            shape="round"
            size="large"
            icon={<FileTextOutlined />}
            href="/api/docs"
            style={{ borderColor: "rgba(255,255,255,0.4)", color: "#fff", background: "rgba(255,255,255,0.1)" }}
          >
            {t.apiDocs}
          </Button>
        </Space>
      </div>
    </div>
  );
}
