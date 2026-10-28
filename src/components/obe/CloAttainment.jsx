import { useState } from 'react';

let uid = 1;
const nid = (p) => `${p}_${Date.now()}_${uid++}`;

// Worked example straight from the Departmental CLO Attainment Analysis (EEE 311).
// Expected course attainment: CLO1 80.56%, CLO2 72.22%, CLO3 63.89%, CLO4 80.56%, CLO5 77.78%.
const EEE311_ROWS = [
  { student: 'Student 1', question: 'Question 2', clo: 'CLO 1', score: '10', max: '12' },
  { student: 'Student 1', question: 'Question 5', clo: 'CLO 2', score: '7', max: '12' },
  { student: 'Student 1', question: 'Question 1', clo: 'CLO 4', score: '8', max: '12' },
  { student: 'Student 2', question: 'Question 6', clo: 'CLO 3', score: '6', max: '12' },
  { student: 'Student 2', question: 'Question 1', clo: 'CLO 4', score: '10', max: '12' },
  { student: 'Student 2', question: 'Question 3', clo: 'CLO 5', score: '10', max: '12' },
  { student: 'Student 3', question: 'Question 2', clo: 'CLO 1', score: '11', max: '12' },
  { student: 'Student 3', question: 'Question 5', clo: 'CLO 2', score: '9', max: '12' },
  { student: 'Student 3', question: 'Question 6', clo: 'CLO 3', score: '8', max: '12' },
  { student: 'Student 4', question: 'Question 5', clo: 'CLO 2', score: '10', max: '12' },
  { student: 'Student 4', question: 'Question 1', clo: 'CLO 4', score: '11', max: '12' },
  { student: 'Student 4', question: 'Question 3', clo: 'CLO 5', score: '7', max: '12' },
  { student: 'Student 5', question: 'Question 2', clo: 'CLO 1', score: '8', max: '12' },
  { student: 'Student 5', question: 'Question 6', clo: 'CLO 3', score: '9', max: '12' },
  { student: 'Student 5', question: 'Question 3', clo: 'CLO 5', score: '11', max: '12' },
];

const blankRow = () => ({ id: nid('r'), student: '', question: '', clo: '', score: '', max: '12' });
const blankCourse = (code = '', title = '') => ({
  id: nid('c'), code, title, rows: [blankRow()],
});

const num = (v) => {
  const n = parseFloat(v);
  return Number.isFinite(n) ? n : null;
};

// Order CLO labels numerically by trailing number, unknowns last.
const cloKey = (clo) => {
  const m = String(clo).match(/(\d+)\s*$/);
  return m ? parseInt(m[1], 10) : 9999;
};

// Per-course attainment: for each CLO, obtained / sum-of-max * 100.
// Rows repeating the same student + question + CLO are duplicates (e.g. pasted
// twice); only the latest entry counts. Returns the merged-away count too.
const courseStats = (rows) => {
  const seen = new Map();
  let duplicates = 0;
  rows.forEach((r) => {
    const key = `${(r.student || '').trim().toLowerCase()}|${(r.question || '').trim().toLowerCase()}|${(r.clo || '').trim().toLowerCase()}`;
    if (seen.has(key)) duplicates += 1;
    seen.set(key, r);
  });
  const byClo = {};
  [...seen.values()].forEach((r) => {
    const clo = (r.clo || '').trim();
    const s = num(r.score);
    const m = num(r.max);
    if (!clo || s === null || m === null || m <= 0 || s < 0) return;
    if (!byClo[clo]) byClo[clo] = { obtained: 0, maxTotal: 0, n: 0 };
    byClo[clo].obtained += s;
    byClo[clo].maxTotal += m;
    byClo[clo].n += 1;
  });
  const clos = Object.keys(byClo).sort((a, b) => cloKey(a) - cloKey(b) || a.localeCompare(b));
  const table = clos.map((clo) => ({
    clo,
    ...byClo[clo],
    pct: byClo[clo].maxTotal > 0 ? (byClo[clo].obtained / byClo[clo].maxTotal) * 100 : 0,
  }));
  const avg = table.length > 0
    ? table.reduce((a, t) => a + t.pct, 0) / table.length
    : null;
  return { table, avg, duplicates };
};

const fmt = (v) => (v === null || v === undefined ? '--' : `${v.toFixed(2)}%`);

const inputStyle = {
  width: '100%', padding: '6px 8px', fontSize: '13px',
  border: '1px solid var(--border, #d7dde5)', borderRadius: '6px',
};

const btnStyle = {
  padding: '7px 14px', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
  border: '1px solid var(--border, #d7dde5)', borderRadius: '6px', background: '#fff',
};

const primaryBtn = { ...btnStyle, background: 'var(--primary-dark)', color: '#fff', border: 'none' };

export default function CloAttainment({ deptData, activeDept, handleSectionClick, handleSubSectionClick }) {
  const [courses, setCourses] = useState([]);
  const [target, setTarget] = useState('70');

  const stats = courses.map((c) => ({ course: c, ...courseStats(c.rows) }));
  const withData = stats.filter((s) => s.table.length > 0);
  const allClos = [...new Set(withData.flatMap((s) => s.table.map((t) => t.clo)))]
    .sort((a, b) => cloKey(a) - cloKey(b) || a.localeCompare(b));
  const targetNum = num(target) ?? 70;

  // Department overall per CLO = mean of course percentages; dept average = mean of course averages.
  const deptByClo = allClos.map((clo) => {
    const vals = withData
      .map((s) => s.table.find((t) => t.clo === clo))
      .filter(Boolean)
      .map((t) => t.pct);
    return { clo, pct: vals.length > 0 ? vals.reduce((a, v) => a + v, 0) / vals.length : null, n: vals.length };
  });
  const deptAvg = withData.length > 0 && withData.every((s) => s.avg !== null)
    ? withData.reduce((a, s) => a + s.avg, 0) / withData.length
    : null;

  const updateCourse = (id, patch) =>
    setCourses((cs) => cs.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  const updateRow = (cid, rid, patch) =>
    setCourses((cs) => cs.map((c) => (c.id === cid
      ? { ...c, rows: c.rows.map((r) => (r.id === rid ? { ...r, ...patch } : r)) }
      : c)));

  return (
    <div className="content-panel" key={`clo-${activeDept}`}>
      <div className="content-panel-header">
        <div className="content-breadcrumb">
          <span onClick={() => handleSectionClick(null)} style={{ cursor: 'pointer' }}>Portal</span>
          <span className="content-breadcrumb-sep">›</span>
          <span onClick={() => handleSubSectionClick(null)} style={{ cursor: 'pointer' }}>{deptData.name}</span>
          <span className="content-breadcrumb-sep">›</span>
          <span className="content-breadcrumb-active">CLO Attainment</span>
        </div>
        <h2 className="content-panel-title">CLO Attainment Calculator</h2>
      </div>
      <div className="content-panel-body">
        <p className="mapping-note">
          Enter raw exam scores per student and question. The tool computes each course's CLO
          attainment as total marks obtained divided by total obtainable marks per CLO,
          then aggregates all courses into the semester departmental report.
          <br />
          <strong>Method:</strong> course CLO % = obtained / max; course average = mean of its CLOs;
          department CLO % = mean across courses; department average = mean of course averages.
          Target defaults to 70%.
        </p>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
          <button style={primaryBtn} onClick={() => setCourses((cs) => [...cs, blankCourse()])}>
            Add course
          </button>
          <button
            style={btnStyle}
            onClick={() => setCourses((cs) => [...cs, {
              ...blankCourse('EEE 311', 'Electric Circuit Theory II'),
              rows: EEE311_ROWS.map((r) => ({ ...r, id: nid('r') })),
            }])}
          >
            Load EEE 311 worked example
          </button>
          <button style={btnStyle} onClick={() => setCourses([])}>Clear all</button>
          <label style={{ marginLeft: 'auto', fontSize: '13px', fontWeight: 600, alignSelf: 'center' }}>
            Target %&nbsp;
            <input
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              style={{ ...inputStyle, width: '70px' }}
              inputMode="decimal"
            />
          </label>
        </div>

        {courses.length === 0 && (
          <div className="list-card">
            <p className="list-card-desc">
              No courses yet. Add a course and enter each student's question-level scores,
              or load the EEE 311 worked example to see the full computation.
            </p>
          </div>
        )}

        {stats.map(({ course, table, avg, duplicates }) => (
          <div className="info-section" key={course.id}>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
              <input
                placeholder="Course code (e.g. EEE 311)"
                value={course.code}
                onChange={(e) => updateCourse(course.id, { code: e.target.value })}
                style={{ ...inputStyle, maxWidth: '220px', fontWeight: 700 }}
              />
              <input
                placeholder="Course title"
                value={course.title}
                onChange={(e) => updateCourse(course.id, { title: e.target.value })}
                style={{ ...inputStyle, flex: '1 1 200px' }}
              />
              <button style={btnStyle} onClick={() => setCourses((cs) => cs.filter((c) => c.id !== course.id))}>
                Remove
              </button>
            </div>

            <div className="mapping-table-wrapper" style={{ marginTop: '10px' }}>
              <table className="mapping-table">
                <thead>
                  <tr>
                    <th>Student</th><th>Question</th><th>CLO</th>
                    <th>Score</th><th>Max</th><th>%</th><th></th>
                  </tr>
                </thead>
                <tbody>
                  {course.rows.map((r) => {
                    const s = num(r.score);
                    const m = num(r.max);
                    const pct = s !== null && m !== null && m > 0 ? (s / m) * 100 : null;
                    return (
                      <tr key={r.id}>
                        <td><input placeholder="Student 1" value={r.student} onChange={(e) => updateRow(course.id, r.id, { student: e.target.value })} style={inputStyle} /></td>
                        <td><input placeholder="Question 1" value={r.question} onChange={(e) => updateRow(course.id, r.id, { question: e.target.value })} style={inputStyle} /></td>
                        <td><input placeholder="CLO 1" value={r.clo} onChange={(e) => updateRow(course.id, r.id, { clo: e.target.value })} style={inputStyle} /></td>
                        <td><input value={r.score} onChange={(e) => updateRow(course.id, r.id, { score: e.target.value })} style={inputStyle} inputMode="decimal" /></td>
                        <td><input value={r.max} onChange={(e) => updateRow(course.id, r.id, { max: e.target.value })} style={inputStyle} inputMode="decimal" /></td>
                        <td style={{ fontWeight: 600 }}>{pct === null ? '--' : `${pct.toFixed(0)}%`}</td>
                        <td>
                          <button
                            style={{ ...btnStyle, padding: '4px 8px' }}
                            onClick={() => updateCourse(course.id, { rows: course.rows.filter((x) => x.id !== r.id) })}
                          >
                            ×
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <button style={{ ...btnStyle, marginTop: '8px' }} onClick={() => updateCourse(course.id, { rows: [...course.rows, blankRow()] })}>
              Add row
            </button>
            <details style={{ marginTop: '8px' }}>
              <summary style={{ cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>
                Paste many rows at once (e.g. from Excel)
              </summary>
              <p className="mapping-note">
                One row per line: student, question, CLO, score, max. Columns can be separated by
                commas, tabs or semicolons. Max defaults to 12 when omitted.
                Example: <code>Student 1, Question 2, CLO 1, 10, 12</code>
              </p>
              <textarea
                id={`paste_${course.id}`}
                rows={4}
                placeholder={'Student 1, Question 2, CLO 1, 10, 12'}
                style={{ ...inputStyle, fontFamily: 'monospace', marginBottom: '8px' }}
              />
              <button
                style={btnStyle}
                onClick={() => {
                  const el = document.getElementById(`paste_${course.id}`);
                  const lines = (el.value || '').split('\n');
                  const parsed = [];
                  lines.forEach((line) => {
                    const parts = line.split(/[,;\t]/).map((p) => p.trim());
                    if (parts.filter((p) => p !== '').length < 4) return;
                    const [student, question, clo, score, max] = parts;
                    if (num(score) === null) return;
                    parsed.push({ id: nid('r'), student, question, clo, score, max: max || '12' });
                  });
                  if (parsed.length > 0) {
                    updateCourse(course.id, {
                      rows: [...course.rows.filter((r) => (r.clo || '').trim() !== '' || (r.score || '').trim() !== '' || (r.student || '').trim() !== ''), ...parsed],
                    });
                    el.value = '';
                  }
                }}
              >
                Append rows
              </button>
            </details>

            {duplicates > 0 && (
              <p className="mapping-note" style={{ marginTop: '10px' }}>
                {duplicates} duplicate row{duplicates === 1 ? '' : 's'} merged (same student, question
                and CLO entered more than once, latest entry kept).
              </p>
            )}
            {table.length > 0 && (
              <div className="mapping-table-wrapper" style={{ marginTop: '12px' }}>
                <table className="mapping-table">
                  <thead>
                    <tr><th>CLO</th><th>Students</th><th>Obtained</th><th>Max</th><th>Attainment</th></tr>
                  </thead>
                  <tbody>
                    {table.map((t) => (
                      <tr key={t.clo}>
                        <td style={{ fontWeight: 600 }}>{t.clo}</td>
                        <td>{t.n}</td>
                        <td>{t.obtained}</td>
                        <td>{t.maxTotal}</td>
                        <td style={{ fontWeight: 700 }}>{fmt(t.pct)}</td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan={4} style={{ fontWeight: 700 }}>Course average</td>
                      <td style={{ fontWeight: 700 }}>{fmt(avg)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}

        {withData.length > 0 && (
          <div className="info-section">
            <h4 className="info-section-title">Semester Departmental CLO Attainment Report</h4>
            <div className="mapping-table-wrapper">
              <table className="mapping-table">
                <thead>
                  <tr>
                    <th>CLO</th>
                    {withData.map((s) => (
                      <th key={s.course.id}>{s.course.code || 'Course'}</th>
                    ))}
                    <th>Overall</th>
                    <th>Target ({targetNum}%)</th>
                  </tr>
                </thead>
                <tbody>
                  {deptByClo.map((d) => {
                    const ok = d.pct !== null && d.pct >= targetNum;
                    return (
                      <tr key={d.clo}>
                        <td style={{ fontWeight: 600 }}>{d.clo}</td>
                        {withData.map((s) => {
                          const t = s.table.find((x) => x.clo === d.clo);
                          return <td key={s.course.id}>{t ? fmt(t.pct) : '--'}</td>;
                        })}
                        <td style={{ fontWeight: 700 }}>{fmt(d.pct)}</td>
                        <td>
                          <span style={{
                            display: 'inline-block', padding: '3px 10px', borderRadius: '4px',
                            fontSize: '12px', fontWeight: 700, color: '#fff',
                            background: ok ? '#1e7e34' : '#b26a00',
                          }}>
                            {d.pct === null ? '--' : ok ? 'Achieved' : 'Action Needed'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                  <tr>
                    <td style={{ fontWeight: 700 }}>Course average</td>
                    {withData.map((s) => <td key={s.course.id} style={{ fontWeight: 700 }}>{fmt(s.avg)}</td>)}
                    <td style={{ fontWeight: 700 }}>{fmt(deptAvg)}</td>
                    <td>
                      <span style={{
                        display: 'inline-block', padding: '3px 10px', borderRadius: '4px',
                        fontSize: '12px', fontWeight: 700, color: '#fff',
                        background: deptAvg !== null && deptAvg >= targetNum ? '#1e7e34' : '#b26a00',
                      }}>
                        {deptAvg === null ? '--' : deptAvg >= targetNum ? 'Target Met' : 'Below Target'}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mapping-note" style={{ marginTop: '10px' }}>
              Based on {withData.length} course{withData.length === 1 ? '' : 's'}.
              Entries are session-local: nothing is uploaded or saved.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
