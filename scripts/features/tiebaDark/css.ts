/**
 * 贴吧深色模式样式,移植自 tieba-dark 仓库的 dark-mode.css
 * 思路:整页反色,再对图片/视频等媒体二次反色还原
 */
export const DARK_CSS = `
/* Base layer: invert the entire page */
html.tieba-dark-mode {
  filter: invert(0.9) hue-rotate(180deg) !important;
  background-color: #111 !important;
}

/* Fix layer: re-invert media elements so images/videos look normal */
html.tieba-dark-mode img,
html.tieba-dark-mode video,
html.tieba-dark-mode canvas,
html.tieba-dark-mode svg image,
html.tieba-dark-mode [style*="background-image"],
html.tieba-dark-mode .tb_icon_author_head,
html.tieba-dark-mode .nicknameEmoji,
html.tieba-dark-mode .threadlist_pic,
html.tieba-dark-mode .BDE_Image,
html.tieba-dark-mode .avatar,
html.tieba-dark-mode .card_head_img {
  filter: invert(1) hue-rotate(180deg) !important;
}

/* Fine-tune layer: Tieba-specific adjustments */

/* Prevent double-filter on nested media */
html.tieba-dark-mode img img,
html.tieba-dark-mode .BDE_Image img {
  filter: none !important;
}

/* Ensure scrollbar blends with dark theme */
html.tieba-dark-mode ::-webkit-scrollbar {
  background-color: #222 !important;
}

html.tieba-dark-mode ::-webkit-scrollbar-thumb {
  background-color: #555 !important;
}

/* Fix emoji and sticker images in posts */
html.tieba-dark-mode .BDE_Smiley {
  filter: invert(1) hue-rotate(180deg) !important;
}

/* Fix user avatars in post list */
html.tieba-dark-mode .p_author_face img,
html.tieba-dark-mode .tb_icon_author_head img {
  filter: invert(1) hue-rotate(180deg) !important;
}
`
