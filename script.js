async function cloneAndClean() {
    const id = document.getElementById('ffid').value;
    const display = document.getElementById('clean-web-display');

    if(!id) return alert("ID-nya mana, Tuan?");

    display.innerHTML = "<h2 style='text-align:center; padding-top:50px;'>MENGKLONING WEB & MEMBERSIHKAN SAMPAH...</h2>";

    try {
        const targetUrl = `https://www.unlockffbeta.com/id/${id}`;
        // Pake AllOrigins buat ambil data HTML mentah
        const res = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`);
        const data = await res.json();
        
        let htmlContent = data.contents;

        // TEKNIK CLONING: Hapus script-script iklan secara paksa
        // Kita buang semua tag <script> yang mengandung keyword iklan atau external link
        const cleanHtml = htmlContent
            .replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gim, (match) => {
                if(match.includes("adsbygoogle") || match.includes("popads") || match.includes("analytics")) {
                    return "";
                }
                return match; // Biar fungsi verifikasi tetep jalan
            })
            // Hapus elemen visual yang biasanya dipake iklan judol
            .replace(/<ins\b[^>]*>([\s\S]*?)<\/ins>/gim, "") 
            .replace(/window.open/g, "console.log"); // Matikan fungsi popup tab baru

        // Masukkan hasil kloningan ke display
        display.innerHTML = cleanHtml;

        // Tambahan: Suntik CSS baru ke dalem hasil clone buat pastiin iklan gak muncul
        const style = document.createElement('style');
        style.innerHTML = "div[class*='ads'], div[id*='ads'], img[src*='judol'] { display:none !important; }";
        display.appendChild(style);

    } catch (e) {
        display.innerHTML = "<h2 style='color:red;'>GAGAL KLONING. SERVER TARGET PROTEKSI TINGGI.</h2>";
    }
}