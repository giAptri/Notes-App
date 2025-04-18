import "./components/note-form.js";
import "./components/note-list.js";
import "./components/loading-indicator.js";
import "./components/toast-notification.js";

import { getAllNotes, createNote, deleteNote, archiveNote, unarchiveNote } from "./api-service.js";

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Make sure we have the loading indicator and toast notification in the DOM
  let loadingEl = document.querySelector("loading-indicator");
  if (!loadingEl) {
    loadingEl = document.createElement("loading-indicator");
    document.body.appendChild(loadingEl);
  }
  
  let toastEl = document.querySelector("toast-notification");
  if (!toastEl) {
    toastEl = document.createElement("toast-notification");
    document.body.appendChild(toastEl);
  }
  
  const noteListEl = document.querySelector("note-list");
  const noteFormEl = document.querySelector("note-form");
  
  // Define show/hide loading using direct style manipulation instead of methods
  const showLoading = () => {
    if (loadingEl) loadingEl.style.display = 'block';
  };
  
  const hideLoading = () => {
    if (loadingEl) loadingEl.style.display = 'none';
  };

  // Show toast notification
  const showToast = (message, type = 'success') => {
    if (toastEl && toastEl.show) {
      toastEl.show(message, type);
    } else if (toastEl) {
      // Fallback if show method isn't available
      alert(message);
    }
  };

  // Render all notes
  const refreshNotes = async () => {
    try {
      showLoading();
      const notes = await getAllNotes();
      if (noteListEl) noteListEl.notes = notes;
    } catch (error) {
      console.error(error);
      alert(`Error: ${error.message}`);
    } finally {
      hideLoading();
    }
  };

  // Handle add note event
  if (noteFormEl) {
    noteFormEl.addEventListener("note-submitted", async (event) => {
      try {
        showLoading();
        await createNote(event.detail);
        showToast("Catatan berhasil ditambahkan!");
        if (noteFormEl.resetForm) noteFormEl.resetForm();
        await refreshNotes();
      } catch (error) {
        console.error(error);
        alert(`Error: ${error.message}`);
      } finally {
        hideLoading();
      }
    });
  }

  // Handle delete note event
  if (noteListEl) {
    noteListEl.addEventListener("delete-note", async (event) => {
      try {
        showLoading();
        // Make sure this matches your event detail structure
        const noteId = event.detail && event.detail.id ? event.detail.id : event.detail;
        await deleteNote(noteId);
        showToast("Catatan berhasil dihapus!");
        await refreshNotes();
      } catch (error) {
        console.error(error);
        alert(`Error: ${error.message}`);
      } finally {
        hideLoading();
      }
    });
    
    // Handle archive note event
    noteListEl.addEventListener("archive-note", async (event) => {
      try {
        showLoading();
        const { id, archived } = event.detail;
        
        if (archived) {
          // If already archived, unarchive it
          await unarchiveNote(id);
          showToast("Catatan berhasil dipindahkan dari arsip!");
        } else {
          // If not archived, archive it
          await archiveNote(id);
          showToast("Catatan berhasil diarsipkan!");
        }
        
        await refreshNotes();
      } catch (error) {
        console.error(error);
        alert(`Error: ${error.message}`);
      } finally {
        hideLoading();
      }
    });
  }

  // Initialize app
  refreshNotes();
});