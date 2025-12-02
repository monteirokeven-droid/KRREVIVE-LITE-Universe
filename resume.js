// KRREVIVEÉLITE Resume — Interactions and PDF export
// - Initializes progress bars
// - Wires the Download Resume (PDF) button using html2pdf.js

(function(){
  // animate progress bars based on data-percent
  function initProgress(){
    document.querySelectorAll('.progress').forEach(p=>{
      const v = parseInt(p.dataset.percent||0,10);
      const bar = p.querySelector('span');
      if(bar){ setTimeout(()=>{ bar.style.width = v + '%'; }, 120); }
    });
  }

  // simple PDF export using html2pdf
  function initPdf(){
    const btn = document.getElementById('downloadPdf');
    if(!btn) return;
    btn.addEventListener('click', ()=>{
      const opt = {
        margin:       0.4,
        filename:     'KRREVIVEELITE_Resume.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, logging: false, useCORS: true },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
      };
      const element = document.querySelector('.rv-root');
      // temporarily remove controls to tidy the PDF
      const actions = document.querySelector('.rv-actions'); if(actions) actions.style.visibility='hidden';
      html2pdf().set(opt).from(element).save().then(()=>{ if(actions) actions.style.visibility='visible'; });
    });
  }

  // small helper to allow easy profile picture replacement via drag-drop (optional)
  function initProfileUpload(){
    const pic = document.getElementById('profilePic');
    if(!pic) return;
    pic.addEventListener('click', ()=>{ alert('Replace the profile placeholder by editing resume.css and setting background-image on #profilePic'); });
  }

  document.addEventListener('DOMContentLoaded', ()=>{ initProgress(); initPdf(); initProfileUpload(); });
})();
