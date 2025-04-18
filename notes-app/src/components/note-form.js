class NoteForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        form {
          background-color: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
          margin-bottom: 20px;
        }
        
        input, textarea {
          width: 100%;
          padding: 12px;
          margin-bottom: 15px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-family: inherit;
          font-size: 16px;
        }
        
        textarea {
          height: 150px;
          resize: vertical;
        }
        
        button {
          background-color: palevioletred;
          color: white;
          border: none;
          padding: 12px 20px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
          transition: background-color 0.3s;
        }
        
        button:hover {
          background-color: #d46a92;
        }
      </style>
      
      <form id="noteForm">
        <input type="text" id="title" placeholder="Judul" required />
        <textarea id="body" placeholder="Isi catatan" required></textarea>
        <button type="submit">Tambah Catatan</button>
      </form>
    `;
  }

  setupEventListeners() {
    const form = this.shadowRoot.getElementById("noteForm");
    const titleInput = this.shadowRoot.getElementById("title");
    const bodyInput = this.shadowRoot.getElementById("body");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = titleInput.value.trim();
      const body = bodyInput.value.trim();

      if (title && body) {
        this.dispatchEvent(
          new CustomEvent("note-submitted", {
            detail: { title, body },
            bubbles: true,
            composed: true,
          })
        );
        this.resetForm();
      } else {
        alert("Judul dan isi catatan tidak boleh kosong.");
      }
    });
  }

  resetForm() {
    this.shadowRoot.getElementById("title").value = "";
    this.shadowRoot.getElementById("body").value = "";
  }
}

customElements.define("note-form", NoteForm);
