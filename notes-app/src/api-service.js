const BASE_URL = "https://notes-api.dicoding.dev/v2";

export const getAllNotes = async () => {
  try {
    const response = await fetch(`${BASE_URL}/notes`);
    const result = await response.json();

    if (response.ok) {
      return result.data;
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    throw new Error(`Gagal memuat catatan: ${error.message}`);
  }
};

export const createNote = async (note) => {
  try {
    const response = await fetch(`${BASE_URL}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });

    const result = await response.json();
    if (response.ok) {
      return result.data;
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    throw new Error(`Gagal menambahkan catatan: ${error.message}`);
  }
};

export const deleteNote = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/notes/${id}`, {
      method: "DELETE",
    });

    const result = await response.json();
    if (response.ok) {
      return result.message;
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    throw new Error(`Gagal menghapus catatan: ${error.message}`);
  }
};

export const archiveNote = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/notes/${id}/archive`, {
      method: "POST",
    });

    const result = await response.json();
    if (response.ok) {
      return result.message;
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    throw new Error(`Gagal mengarsipkan catatan: ${error.message}`);
  }
};

export const unarchiveNote = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/notes/${id}/unarchive`, {
      method: "POST",
    });

    const result = await response.json();
    if (response.ok) {
      return result.message;
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    throw new Error(`Gagal mengembalikan catatan dari arsip: ${error.message}`);
  }
};