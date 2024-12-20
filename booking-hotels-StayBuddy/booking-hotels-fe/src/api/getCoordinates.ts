export default async function getCoordinates(address: string) {
  const baseUrl = 'https://nominatim.openstreetmap.org/search';
  const url = `${baseUrl}?q=${encodeURIComponent(address)}&format=json&addressdetails=1`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.length > 0) {
      const { lat, lon } = data[0]; 
      return { latitude: lat, longitude: lon };
    } else {
      console.error('Không tìm thấy tọa độ cho địa chỉ này.');
      return null;
    }
  } catch (error) {
    console.error('Lỗi khi gọi API:', error);
    return null;
  }
}
