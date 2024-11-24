export default function handler(req, res) {
  if (req.method === "POST") {
    const { latitude, longitude, speed } = req.body;

    if (!latitude || !longitude) {
      return res.status(400).json({ message: "Data tidak lengkap" });
    }

    console.log(`Latitude: ${latitude}, Longitude: ${longitude}, Speed: ${speed}`);

    // Simpan data lokasi terbaru di memori server
    global.latestLocation = { latitude, longitude, speed, timestamp: new Date() };
    return res.status(200).json({ message: "Data lokasi diterima" });
  }

  if (req.method === "GET") {
    // Kirimkan data lokasi terbaru
    if (!global.latestLocation) {
      return res.status(404).json({ message: "Data lokasi belum tersedia" });
    }
    return res.status(200).json(global.latestLocation);
  }

  res.setHeader("Allow", ["POST", "GET"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
