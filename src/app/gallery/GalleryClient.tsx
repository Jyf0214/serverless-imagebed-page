"use client";

import Image from "next/image";
import { Row, Col, Card, Pagination, Typography, Empty, Space } from "antd";
import { useLocale } from "@/i18n/useLocale";
import type { ImageItem } from "@/lib/images";

const { Title } = Typography;
const PER_PAGE = 12;

export default function GalleryClient({
  images,
  page,
}: {
  images: ImageItem[];
  page: number;
}) {
  const { t } = useLocale();
  const total = Math.max(1, Math.ceil(images.length / PER_PAGE));
  const start = (page - 1) * PER_PAGE;
  const slice = images.slice(start, start + PER_PAGE);

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "40px 24px" }}>
      <Title level={2} style={{ marginBottom: 32 }}>
        {t.galleryTitle}
      </Title>

      {slice.length === 0 ? (
        <Empty description="暂无图片" />
      ) : (
        <Row gutter={[16, 16]}>
          {slice.map((img) => (
            <Col key={img.url} xs={12} sm={8} md={6}>
              <Card
                hoverable
                cover={
                  <div style={{ position: "relative", aspectRatio: "1/1", overflow: "hidden" }}>
                    <Image
                      src={img.url}
                      alt=""
                      fill
                      unoptimized
                      sizes="(max-width: 576px) 50vw, (max-width: 768px) 33vw, 25vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                }
                styles={{ body: { padding: 0 } }}
                style={{ borderRadius: 8, overflow: "hidden" }}
              />
            </Col>
          ))}
        </Row>
      )}

      <Space orientation="vertical" align="center" style={{ width: "100%", marginTop: 32 }} size="middle">
        <Typography.Text type="secondary">
          {t.page.replace("{cur}", String(page)).replace("{total}", String(total))}
        </Typography.Text>
        <Pagination
          current={page}
          total={images.length}
          pageSize={PER_PAGE}
          showSizeChanger={false}
          onChange={(p) => {
            window.location.href = `/gallery?page=${p}`;
          }}
        />
      </Space>
    </div>
  );
}
