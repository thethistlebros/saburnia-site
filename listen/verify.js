(function () {
  const BACKEND = "https://onetimelinks.onrender.com";
  const VERIFY_PATH = "/verify";

  const elStatus  = document.getElementById("status");
  const elExpired = document.getElementById("expired");
  const elPlayer  = document.getElementById("player");
  const elAudio   = document.getElementById("audio");
  const elMeta    = document.getElementById("trackMeta");

  function getLinkId() {
    const parts = window.location.pathname.split("/").filter(Boolean);
    return parts[1] || "";
  }

  async function verifyAndPlay() {
    const id = getLinkId();
    if (!id) return showExpired("Missing link id.");

    try {
      const res = await fetch(`${BACKEND}${VERIFY_PATH}/${encodeURIComponent(id)}`, {
        method: "GET",
        credentials: "omit",
        cache: "no-store",
        redirect: "follow",
      });

      if (!res.ok) {
        return showExpired(`Server returned ${res.status}.`);
      }

      const data = await res.json();
      if (!data || !data.valid || !data.audio_url) {
        return showExpired("Invalid or expired link.");
      }

      elMeta.textContent = data.title ? `Playing: ${data.title}` : "Playing your track";
      elAudio.src = data.audio_url;

      elStatus.classList.add("hidden");
      elExpired.classList.add("hidden");
      elPlayer.classList.remove("hidden");

      try { await elAudio.play(); } catch (_) {}
    } catch (err) {
      showExpired("Network error. Please try again.");
      console.error(err);
    }
  }

  function showExpired(msg) {
    elStatus.classList.add("hidden");
    elPlayer.classList.add("hidden");
    elExpired.classList.remove("hidden");
    if (msg) {
      const p = elExpired.querySelector("p");
      if (p) p.textContent = String(msg);
    }
  }

  verifyAndPlay();
})();