import jsPDF from 'jspdf';
import { CVProfile } from '../data/defaultCV';

export function generateResumePdf(data: CVProfile): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 40;
  const contentWidth = pageWidth - margin * 2;

  let y = 48;

  const tealColor: [number, number, number] = [15, 118, 110]; // #0f766e
  const darkTextColor: [number, number, number] = [17, 24, 39]; // #111827
  const mutedTextColor: [number, number, number] = [75, 85, 99]; // #4b5563
  const lightLineColor: [number, number, number] = [15, 118, 110]; // #0f766e

  // Helper to draw section header with underline rule
  const drawSectionHeader = (title: string) => {
    y += 12;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(...tealColor);
    doc.text(title.toUpperCase(), margin, y);

    y += 4;
    doc.setDrawColor(...lightLineColor);
    doc.setLineWidth(0.8);
    doc.line(margin, y, pageWidth - margin, y);
    y += 10;
  };

  // Helper to add bullet point with hanging indent
  const drawBullet = (text: string, indent = 12) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(...darkTextColor);

    const bulletSymbol = '• ';
    const bulletWidth = doc.getTextWidth(bulletSymbol);
    const startX = margin + indent;
    const textWidth = contentWidth - indent - bulletWidth;

    const lines = doc.splitTextToSize(text, textWidth);

    doc.text(bulletSymbol, startX, y);
    doc.text(lines, startX + bulletWidth + 2, y);

    y += lines.length * 11 + 2;
  };

  // ──────────────────────────────────────────
  // HEADER
  // ──────────────────────────────────────────
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(...tealColor);
  doc.text(data.name.toUpperCase(), margin, y);
  y += 16;

  // Contact line 1
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...darkTextColor);

  const contactItems = [
    data.email,
    data.phone ? data.phone : null,
    data.location,
  ].filter(Boolean);

  doc.text(contactItems.join('  |  '), margin, y);
  y += 12;

  // Contact line 2: Links
  const links: { label: string; text: string; url: string }[] = [];
  if (data.linkedin) {
    links.push({
      label: 'LinkedIn: ',
      text: data.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\//, ''),
      url: data.linkedin.startsWith('http') ? data.linkedin : `https://${data.linkedin}`,
    });
  }
  if (data.github) {
    links.push({
      label: 'Github: ',
      text: data.github,
      url: data.github.startsWith('http') ? data.github : `https://${data.github}`,
    });
  }
  if (data.website) {
    links.push({
      label: 'Portfolio: ',
      text: data.website,
      url: data.website.startsWith('http') ? data.website : `https://${data.website}`,
    });
  }

  let curX = margin;
  links.forEach((item, idx) => {
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...darkTextColor);
    doc.text(item.label, curX, y);
    curX += doc.getTextWidth(item.label);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...tealColor);
    doc.text(item.text, curX, y);
    doc.link(curX, y - 7, doc.getTextWidth(item.text), 9, { url: item.url });
    curX += doc.getTextWidth(item.text);

    if (idx < links.length - 1) {
      doc.setTextColor(...mutedTextColor);
      doc.text('   ', curX, y);
      curX += doc.getTextWidth('   ');
    }
  });
  y += 6;

  // ──────────────────────────────────────────
  // 1. PROFESSIONAL SUMMARY
  // ──────────────────────────────────────────
  drawSectionHeader('Professional Summary');

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8.5);
  doc.setTextColor(...darkTextColor);
  const summaryLines = doc.splitTextToSize(data.summary, contentWidth);
  doc.text(summaryLines, margin, y);
  y += summaryLines.length * 11.5 + 4;

  // ──────────────────────────────────────────
  // 2. TECHNICAL SKILLS
  // ──────────────────────────────────────────
  drawSectionHeader('Technical Skills');

  data.skills.forEach((skillGroup) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(...darkTextColor);
    const catText = `${skillGroup.category}: `;
    doc.text(catText, margin, y);
    const catWidth = doc.getTextWidth(catText);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...darkTextColor);
    const itemsText = skillGroup.items.join(', ');
    const remainingWidth = contentWidth - catWidth;
    const itemLines = doc.splitTextToSize(itemsText, remainingWidth);

    doc.text(itemLines, margin + catWidth, y);
    y += itemLines.length * 11 + 2;
  });

  // ──────────────────────────────────────────
  // 3. PROJECT EXPERIENCE
  // ──────────────────────────────────────────
  drawSectionHeader('Project Experience');

  data.projects.forEach((proj) => {
    // Title & Period
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...darkTextColor);
    doc.text(proj.title, margin, y);

    if (proj.period) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(...mutedTextColor);
      const periodWidth = doc.getTextWidth(proj.period);
      doc.text(proj.period, pageWidth - margin - periodWidth, y);
    }
    y += 11;

    // Tech Stack
    if (proj.tech && proj.tech.length > 0) {
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(8);
      doc.setTextColor(...mutedTextColor);
      const techText = `Tech: ${proj.tech.join(', ')}`;
      const techLines = doc.splitTextToSize(techText, contentWidth);
      doc.text(techLines, margin, y);
      y += techLines.length * 9.5 + 2;
    }

    // Highlights
    if (proj.highlights && proj.highlights.length > 0) {
      proj.highlights.forEach((h) => {
        drawBullet(h, 8);
      });
    }
    y += 4;
  });

  // ──────────────────────────────────────────
  // 4. EDUCATION
  // ──────────────────────────────────────────
  drawSectionHeader('Education');

  data.education.forEach((ed) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...darkTextColor);
    doc.text(ed.degree, margin, y);

    if (ed.period) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(...mutedTextColor);
      const periodWidth = doc.getTextWidth(ed.period);
      doc.text(ed.period, pageWidth - margin - periodWidth, y);
    }
    y += 10.5;

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8.5);
    doc.setTextColor(...mutedTextColor);
    const instText = `${ed.institution}${ed.location ? `, ${ed.location}` : ''}`;
    doc.text(instText, margin, y);
    y += 12;
  });

  // ──────────────────────────────────────────
  // 5. ADDITIONAL ACTIVITIES
  // ──────────────────────────────────────────
  if (data.experience && data.experience.length > 0) {
    drawSectionHeader('Additional Activities');

    data.experience.forEach((exp) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(...darkTextColor);
      doc.text(exp.role, margin, y);

      if (exp.period) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(...mutedTextColor);
        const periodWidth = doc.getTextWidth(exp.period);
        doc.text(exp.period, pageWidth - margin - periodWidth, y);
      }
      y += 10.5;

      doc.setFont('helvetica', 'italic');
      doc.setFontSize(8.5);
      doc.setTextColor(...mutedTextColor);
      const compText = `${exp.company}${exp.location ? ` | ${exp.location}` : ''}`;
      doc.text(compText, margin, y);
      y += 11;

      if (exp.highlights && exp.highlights.length > 0) {
        exp.highlights.forEach((h) => {
          drawBullet(h, 8);
        });
      }
      y += 2;
    });
  }

  // ──────────────────────────────────────────
  // PAGE FOOTER
  // ──────────────────────────────────────────
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...mutedTextColor);
  const footerText = 'Page 1';
  const footerWidth = doc.getTextWidth(footerText);
  doc.text(footerText, (pageWidth - footerWidth) / 2, pageHeight - 20);

  // Save PDF file
  const fileName = `${data.name.toLowerCase().replace(/\s+/g, '_')}_resume.pdf`;
  doc.save(fileName);
}
