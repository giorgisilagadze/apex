export async function FetchProjects() {
  try {
    const res = await fetch(
      `https://apex.artspace.support/building?status=მშენებარე`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
}
