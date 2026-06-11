const ALBUM_URL = "https://album-vsoft.vercel.app/";

document.getElementById("abrirAlbum").addEventListener("click", () => {
  chrome.tabs.create({ url: ALBUM_URL });
});