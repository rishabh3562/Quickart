import dbConnect from "@/lib/dbconnect";

export default async function handler(req, res) {
  try {
    const res2 = await dbConnect();
    res.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate');
    res.status(200).json({ name: "db connected", msg: res2 });

  } catch (error) {
    res.status(500).json({ name: "db connection failed", msg: error });
  }

}
