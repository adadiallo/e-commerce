export async function uploadToCloudinary(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file); // le fichier image choisi par l'utilisateur
  formData.append('upload_preset', 'vetements_upload'); // ton upload preset

  const res = await fetch(`https://api.cloudinary.com/v1_1/dmtwahkop/image/upload`, {
    method: 'POST',
    body: formData,
  });

  const data = await res.json();
  return data.secure_url; // URL de l’image hébergée
}

