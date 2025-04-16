export async function FetchGallery(type: string) {
  try {
    const res = await fetch(
      `https://apex.artspace.support/galery?type=${type}`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching gallery:", error);
    throw error;
  }
}
