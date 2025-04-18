import "./note-item.js";

class NoteList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._notes = [];
    this._view = "active"; // 'active' or 'archived'
  }

  set notes(notes) {
    this._notes = notes;
    this.render();
  }
  
  set view(view) {
    this._view = view;
    this.render();
  }

  render() {
    const filteredNotes = this._notes.filter(note => 
      this._view === "active" ? !note.archived : note.archived
    );

    const emptyMessage = this._view === "active" 
      ? "Tidak ada catatan aktif. Silakan tambahkan catatan baru."
      : "Tidak ada catatan terarsip.";

    this.shadowRoot.innerHTML = `
      <style>
        .notes-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
          padding: 20px;
        }
        
        .view-toggle {
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
        }
        
        .view-toggle button {
          background-color: #f8f9fa;
          border: 1px solid #dee2e6;
          padding: 10px 20px;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .view-toggle button:first-child {
          border-top-left-radius: 5px;
          border-bottom-left-radius: 5px;
        }
        
        .view-toggle button:last-child {
          border-top-right-radius: 5px;
          border-bottom-right-radius: 5px;
        }
        
        .view-toggle button.active {
          background-color: palevioletred;
          color: white;
          border-color: palevioletred;
        }
        
        .empty-message {
          grid-column: 1 / -1;
          text-align: center;
          padding: 30px;
          color: #6c757d;
          font-style: italic;
        }
      </style>
      
      <div class="view-toggle">
        <button class="${this._view === 'active' ? 'active' : ''}" id="active-btn">Active Notes</button>
        <button class="${this._view === 'archived' ? 'active' : ''}" id="archived-btn">Archived Notes</button>
      </div>
      
      <div class="notes-container">
        ${filteredNotes.length > 0 
          ? filteredNotes.map(note => 
              `<note-item 
                id="${note.id}" 
                title="${note.title}" 
                body="${note.body}" 
                created-at="${note.createdAt}"
                archived="${note.archived}"
              ></note-item>`
            ).join("")
          : `<div class="empty-message">${emptyMessage}</div>`
        }
      </div>
    `;

    // Add event listeners to view toggle buttons
    this.shadowRoot.getElementById('active-btn').addEventListener('click', () => {
      this._view = 'active';
      this.render();
    });
    
    this.shadowRoot.getElementById('archived-btn').addEventListener('click', () => {
      this._view = 'archived';
      this.render();
    });
  }
}

customElements.define("note-list", NoteList);