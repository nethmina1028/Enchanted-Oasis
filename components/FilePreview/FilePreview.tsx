import React from "react";
import styles from "./FilePreview.module.css";

import Link from "next/link";

export default function FilePreview({ url }: { url: string }) {
  let slicedUrl;
  if (url.length > 50) {
    slicedUrl = url.slice(0, 50) + "...";
  } else {
    slicedUrl = url;
  }
  return (
    <Link href={url} rel="noopener noreferrer" target="_blank">
      <div className={styles.filePreview}>{slicedUrl}</div>
    </Link>
  );
}
