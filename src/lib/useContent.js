import { useState, useEffect } from "react";
import api from "./api";
import { CONTENT } from "@/data/content";

let cache = CONTENT;

export function useContent() {
  const [content, setContent] = useState(cache);
  useEffect(() => {
    api.get("/content").then((r) => {
      cache = r.data;
      setContent(r.data);
    }).catch(() => {});
  }, []);
  return content;
}

export function clearContentCache() {
  cache = CONTENT;
}

export function usePageSeo(key, defaultTitle, defaultDesc) {
  const content = useContent();
  useEffect(() => {
    const seo = content?.seo;
    const pg = seo?.pages?.[key] || {};
    const title = pg.title || defaultTitle || seo?.site_title;
    const desc = pg.description || defaultDesc || seo?.site_description;
    if (title) document.title = title;
    const m = document.querySelector('meta[name="description"]');
    if (m && desc) m.setAttribute("content", desc);
  }, [content, key, defaultTitle, defaultDesc]);
}
