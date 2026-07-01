"use client";

import Link from "next/link";
import { Typography, Table, Tag, Card, Button, Space } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

const BASE = "/api/random";

const dataSource = [
  { key: "1", name: "orientation", val: "h / horizontal", desc: "横图" },
  { key: "2", name: "orientation", val: "v / vertical", desc: "竖图" },
  { key: "3", name: "orientation", val: "（不传）", desc: "随机" },
  { key: "4", name: "source", val: "link", desc: "仅使用 txt 文件中的链接" },
  { key: "5", name: "source", val: "file", desc: "仅使用服务器本地图片文件" },
  { key: "6", name: "source", val: "all", desc: "链接 + 本地文件混合（默认）" },
  { key: "7", name: "mode", val: "inline", desc: "返回 JSON，默认" },
  { key: "8", name: "mode", val: "redirect", desc: "302 重定向到图片 URL" },
  { key: "9", name: "mode", val: "image", desc: "直接返回图片二进制" },
];

const tableCols = [
  {
    title: "参数",
    dataIndex: "name",
    onCell: (record: any) => {
      const idx = dataSource.findIndex((r) => r.key === record.key);
      const prev = dataSource[idx - 1];
      if (!prev || prev.name !== record.name) {
        return { rowSpan: dataSource.filter((r) => r.name === record.name).length };
      }
      return { rowSpan: 0 };
    },
  },
  { title: "可选值", dataIndex: "val", render: (v: string) => <Text code>{v}</Text> },
  { title: "说明", dataIndex: "desc" },
];

const examples = [
  { url: `${BASE}`, desc: "随机图片（全部来源），返回 JSON" },
  { url: `${BASE}?orientation=h`, desc: "随机横图，返回 JSON" },
  { url: `${BASE}?orientation=v&mode=redirect`, desc: "竖图，302 重定向" },
  { url: `${BASE}?source=link`, desc: "仅从 txt 链接中随机" },
  { url: `${BASE}?source=file`, desc: "仅从服务器本地文件中随机" },
  { url: `${BASE}?source=file&orientation=v`, desc: "仅本地竖图" },
  { url: `${BASE}?mode=image`, desc: "随机图片，直接返回图片" },
  { url: `${BASE}/image`, desc: "直接返回随机图片（快捷路径）" },
  { url: `${BASE}/image?orientation=v&source=link`, desc: "直接返回 txt 中的随机竖图" },
];

export default function ApiDocsPage() {
  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "40px 24px" }}>
      <Link href="/">
        <Button type="link" icon={<ArrowLeftOutlined />} style={{ marginBottom: 24 }}>
          返回首页
        </Button>
      </Link>

      <Title level={1}>随机一图 API</Title>
      <Paragraph type="secondary" style={{ fontSize: 16 }}>
        随机返回一张图片，支持横图 / 竖图筛选，图片来源支持 txt 链接、服务器本地文件或混合。
      </Paragraph>

      <Title level={3}>接口地址</Title>
      <Card size="small">
        <Space>
          <Tag color="blue">GET</Tag>
          <Text code>{BASE}</Text>
          <Text type="secondary">|</Text>
          <Text code>{BASE}/image</Text>
        </Space>
      </Card>

      <Title level={3} style={{ marginTop: 32 }}>
        请求参数
      </Title>
      <Table
        dataSource={dataSource}
        columns={tableCols}
        pagination={false}
        size="small"
        bordered
      />

      <Title level={3} style={{ marginTop: 32 }}>
        调用示例
      </Title>
      <Space orientation="vertical" style={{ width: "100%" }} size="small">
        {examples.map((e) => (
          <Card key={e.url} size="small">
            <Space orientation="vertical" size={2}>
              <Text code style={{ fontSize: 13 }}>
                {e.url}
              </Text>
              <Text type="secondary">{e.desc}</Text>
            </Space>
          </Card>
        ))}
      </Space>

      <Title level={3} style={{ marginTop: 32 }}>
        响应示例
      </Title>
      <Paragraph type="secondary">
        当 <Text code>mode=inline</Text>（默认）时返回 JSON：
      </Paragraph>
      <pre
        style={{
          background: "#141414",
          color: "#e6e6e6",
          padding: 16,
          borderRadius: 8,
          fontSize: 13,
          overflow: "auto",
        }}
      >
{`{
  "url": "https://images.unsplash.com/photo-xxx?w=1920&q=80",
  "orientation": "h",
  "source": "all"
}`}
      </pre>

      <Title level={3} style={{ marginTop: 32 }}>
        直接图片路径
      </Title>
      <Paragraph type="secondary">
        <Text code>{BASE}/image</Text> 可直接用作{" "}
        <Text code>&lt;img src="..."&gt;</Text>，无需解析 JSON。
      </Paragraph>
      <pre
        style={{
          background: "#141414",
          color: "#e6e6e6",
          padding: 16,
          borderRadius: 8,
          fontSize: 13,
        }}
      >
{`<img src="${BASE}/image?orientation=h&source=file" />`}
      </pre>
    </div>
  );
}
