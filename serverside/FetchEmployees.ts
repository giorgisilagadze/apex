export async function FetchEmployees() {
  try {
    const res = await fetch(`https://apex.artspace.support/employ`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
}
