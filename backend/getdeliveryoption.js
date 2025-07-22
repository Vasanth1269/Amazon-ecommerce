 
export async function getDeliveryOptions() {
  try {
    const response = await fetch("./data/OptionDelivery.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to load delivery options:", error);
    return [];
  }
}
