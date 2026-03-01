import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaPhone, FaMapMarkerAlt, FaBriefcase, FaTint, FaEdit, FaSave, FaSchool, FaUniversity, FaCalendar, FaChevronDown, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import toast from 'react-hot-toast';

/* ─── Custom Dropdown ─────────────────────────────────────── */
const CustomSelect = ({ value, onChange, options, placeholder = 'Select', disabled }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const selected = options.find(o => (o.value ?? o) === value);
    const label = selected ? (selected.label ?? selected) : null;

    return (
        <div ref={ref} className={`cs-wrap${disabled ? ' cs-disabled' : ''}`}>
            <button
                type="button"
                className={`cs-trigger${open ? ' cs-open' : ''}`}
                onClick={() => !disabled && setOpen(o => !o)}
                disabled={disabled}
            >
                <span className={label ? 'cs-val' : 'cs-placeholder'}>{label || placeholder}</span>
                {!disabled && <FaChevronDown className={`cs-arrow${open ? ' cs-arrow-up' : ''}`} />}
            </button>
            {open && (
                <div className="cs-dropdown">
                    {options.map(opt => {
                        const val = opt.value ?? opt;
                        const lbl = opt.label ?? opt;
                        return (
                            <div
                                key={val}
                                className={`cs-option${val === value ? ' cs-selected' : ''}`}
                                onClick={() => { onChange(val); setOpen(false); }}
                            >
                                {lbl}
                                {val === value && <span className="cs-check">✓</span>}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

/* ─── Custom Date Picker ──────────────────────────────────── */
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const MONTHS_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const DAYS = ['Su','Mo','Tu','We','Th','Fr','Sa'];
const THIS_YEAR = new Date().getFullYear();
const YEAR_LIST = Array.from({ length: 100 }, (_, i) => THIS_YEAR - i);

const CustomDatePicker = ({ value, onChange, disabled }) => {
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState('day'); // 'day' | 'month' | 'year'
    const ref = useRef(null);
    const yearListRef = useRef(null);

    const parsed = value ? new Date(value + 'T00:00:00') : null;
    const [viewYear, setViewYear] = useState(parsed?.getFullYear() || THIS_YEAR);
    const [viewMonth, setViewMonth] = useState(parsed?.getMonth() ?? new Date().getMonth());

    useEffect(() => {
        const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) { setOpen(false); setMode('day'); } };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    // Scroll selected year into view when year picker opens
    useEffect(() => {
        if (mode === 'year' && yearListRef.current) {
            const sel = yearListRef.current.querySelector('.dp-year-sel');
            if (sel) sel.scrollIntoView({ block: 'center' });
        }
    }, [mode]);

    const displayVal = parsed
        ? `${parsed.getDate()} ${MONTHS_SHORT[parsed.getMonth()]} ${parsed.getFullYear()}`
        : null;

    const firstDay = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const cells = [];
    for (let i = 0; i < firstDay; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);

    const select = (d) => {
        if (!d) return;
        const mm = String(viewMonth + 1).padStart(2, '0');
        const dd = String(d).padStart(2, '0');
        onChange(`${viewYear}-${mm}-${dd}`);
        setOpen(false); setMode('day');
    };

    const prevMonth = () => { if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); } else setViewMonth(m => m - 1); };
    const nextMonth = () => { if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); } else setViewMonth(m => m + 1); };

    const isSelected = (d) => parsed && d && parsed.getDate() === d && parsed.getMonth() === viewMonth && parsed.getFullYear() === viewYear;
    const isToday = (d) => { const t = new Date(); return d === t.getDate() && viewMonth === t.getMonth() && viewYear === t.getFullYear(); };

    return (
        <div ref={ref} className={`dp-wrap${disabled ? ' dp-disabled' : ''}`}>
            <button type="button" className={`dp-trigger${open ? ' dp-open' : ''}`} onClick={() => !disabled && setOpen(o => !o)} disabled={disabled}>
                <FaCalendar className="dp-icon" />
                <span className={displayVal ? 'dp-val' : 'dp-placeholder'}>{displayVal || 'Select date'}</span>
                {!disabled && <FaChevronDown className={`dp-arrow${open ? ' dp-arrow-up' : ''}`} />}
            </button>
            {open && (
                <div className="dp-popup">
                    {/* Header with clickable Month & Year */}
                    <div className="dp-header">
                        {mode === 'day' && <button type="button" className="dp-nav" onClick={prevMonth}><FaChevronLeft /></button>}
                        <div className="dp-header-center">
                            <button type="button" className={`dp-hdr-btn${mode === 'month' ? ' dp-hdr-active' : ''}`} onClick={() => setMode(m => m === 'month' ? 'day' : 'month')}>
                                {MONTHS[viewMonth]}
                            </button>
                            <button type="button" className={`dp-hdr-btn${mode === 'year' ? ' dp-hdr-active' : ''}`} onClick={() => setMode(m => m === 'year' ? 'day' : 'year')}>
                                {viewYear}
                            </button>
                        </div>
                        {mode === 'day' && <button type="button" className="dp-nav" onClick={nextMonth}><FaChevronRight /></button>}
                    </div>

                    {/* Month Picker */}
                    {mode === 'month' && (
                        <div className="dp-month-grid">
                            {MONTHS_SHORT.map((m, i) => (
                                <button key={m} type="button"
                                    className={`dp-month-btn${i === viewMonth ? ' dp-month-sel' : ''}`}
                                    onClick={() => { setViewMonth(i); setMode('day'); }}
                                >{m}</button>
                            ))}
                        </div>
                    )}

                    {/* Year Picker */}
                    {mode === 'year' && (
                        <div className="dp-year-list" ref={yearListRef}>
                            {YEAR_LIST.map(y => (
                                <button key={y} type="button"
                                    className={`dp-year-btn${y === viewYear ? ' dp-year-sel' : ''}`}
                                    onClick={() => { setViewYear(y); setMode('day'); }}
                                >{y}</button>
                            ))}
                        </div>
                    )}

                    {/* Day Grid */}
                    {mode === 'day' && (<>
                        <div className="dp-weekdays">
                            {DAYS.map(d => <span key={d} className="dp-weekday">{d}</span>)}
                        </div>
                        <div className="dp-grid">
                            {cells.map((d, i) => (
                                <button key={i} type="button"
                                    className={`dp-day${!d ? ' dp-empty' : ''}${isSelected(d) ? ' dp-day-sel' : ''}${isToday(d) && !isSelected(d) ? ' dp-today' : ''}`}
                                    onClick={() => select(d)}
                                >{d}</button>
                            ))}
                        </div>
                    </>)}

                    {value && (
                        <div className="dp-footer">
                            <button type="button" className="dp-clear" onClick={() => { onChange(''); setOpen(false); setMode('day'); }}>Clear date</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

/* ─── Field Wrapper ───────────────────────────────────────── */
const PF = ({ label, icon, children }) => (
    <div className="p-field">
        <div className="p-label">{icon && icon}{label}</div>
        {children}
    </div>
);

/* ─── Main Component ──────────────────────────────────────── */
const Profile = () => {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [uploading, setUploading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) { navigate('/login'); return; }
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:3000/api/user/profile', { headers: { 'Authorization': `Bearer ${token}` } });
            const data = await res.json();
            setUser(data); setFormData(data);
        } catch { toast.error('Failed to load profile'); }
    };

    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:3000/api/user/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            setUser(data);
            localStorage.setItem('user', JSON.stringify({ id: data.id, name: data.name, email: data.email, photo: data.photo }));
            setIsEditing(false);
            toast.success('Profile updated successfully!');
            window.location.reload();
        } catch { toast.error('Failed to update profile'); }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploading(true);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/upload', {
                    method: 'POST', headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ file: reader.result })
                });
                const data = await res.json();
                setFormData(f => ({ ...f, photo: data.imageUrl }));
                setUser(u => ({ ...u, photo: data.imageUrl }));
                toast.success('Image uploaded!');
            } catch { toast.error('Failed to upload image'); }
            finally { setUploading(false); }
        };
    };

    const set = (key) => (val) => setFormData(f => ({ ...f, [key]: val }));

    const bloodGroups = ['A+','A-','B+','B-','O+','O-','AB+','AB-'].map(v => ({ value: v, label: v }));
    const years = Array.from({ length: 30 }, (_, i) => { const y = String(2025 - i); return { value: y, label: y }; });
    const profTypes = [
        { value: 'Student', label: '🎓  Student' },
        { value: 'Teacher', label: '👨‍🏫  Teacher' },
        { value: 'Doctor', label: '⚕️  Doctor' },
        { value: 'Engineer', label: '👷  Engineer' },
        { value: 'Business', label: '💼  Business' },
        { value: 'Private Sector', label: '🏢  Private Sector' },
        { value: 'Army Person', label: '🎖️  Army Person' },
        { value: 'Govt Job', label: '🏛️  Govt Job' },
        { value: 'Probasi', label: '✈️  Probasi' },
    ];

    if (!user) return (
        <div style={{ minHeight:'100vh', background:'#f0fdf4', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'sans-serif', color:'#00b09b', fontSize:14 }}>
            Loading...
        </div>
    );

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

                .profile-wrap *, .profile-wrap *::before, .profile-wrap *::after { box-sizing: border-box; margin: 0; padding: 0; }

                .profile-wrap {
                    --bg: #f5f7f5;
                    --surface: #ffffff;
                    --surface2: #f7faf7;
                    --border: #e2e8e2;
                    --border-hover: #b6c9b6;
                    --primary: #00b09b;
                    --primary-dark: #008f7e;
                    --primary-light: #38d39f;
                    --primary-dim: rgba(0,176,155,0.09);
                    --primary-dim2: rgba(0,176,155,0.16);
                    --text-primary: #1a2420;
                    --text-secondary: #5a6b65;
                    --text-muted: #96a89e;
                    --red: #e05c5c;
                    --shadow-sm: 0 1px 3px rgba(0,0,0,0.05), 0 2px 8px rgba(0,0,0,0.04);
                    --shadow-md: 0 4px 16px rgba(0,0,0,0.08), 0 8px 28px rgba(0,0,0,0.05);
                    --radius: 11px;

                    min-height: 100vh;
                    background: var(--bg);
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    padding: 32px 16px 48px;
                    animation: profileIn 0.3s ease;
                }
                @keyframes profileIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }

                .p-container { max-width: 1080px; margin: 0 auto; }

                /* Hero */
                .p-hero-card { background: var(--surface); border: 1px solid var(--border); border-radius: 20px; margin-bottom: 18px; overflow: hidden; box-shadow: var(--shadow-sm); }
                .p-hero-banner { height: 120px; background: linear-gradient(130deg, #00b09b 0%, #38d39f 60%, #96fbc4 100%); position: relative; overflow: hidden; }
                .p-hero-banner::after { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at 15% 60%, rgba(255,255,255,0.18) 0%, transparent 50%), radial-gradient(circle at 85% 20%, rgba(255,255,255,0.12) 0%, transparent 40%); }
                .p-hero-body { padding: 16px 24px 24px; }
                .p-hero-row { display: flex; align-items: center; gap: 18px; flex-wrap: wrap; }

                .p-avatar-wrap { position: relative; flex-shrink: 0; }
                .p-avatar-ring { width: 88px; height: 88px; border-radius: 50%; padding: 3px; background: white; box-shadow: 0 4px 18px rgba(0,176,155,0.22), 0 0 0 1px rgba(0,176,155,0.14); }
                .p-avatar-inner { width: 100%; height: 100%; border-radius: 50%; background: linear-gradient(135deg, #d1fae5, #a7f3d0); overflow: hidden; display: flex; align-items: center; justify-content: center; }
                .p-avatar-inner img { width: 100%; height: 100%; object-fit: cover; }
                .p-avatar-edit { position: absolute; bottom: 2px; right: 2px; width: 26px; height: 26px; border-radius: 50%; background: var(--primary); border: 2px solid white; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 11px; transition: background 0.2s, transform 0.2s; box-shadow: 0 2px 8px rgba(0,176,155,0.4); }
                .p-avatar-edit:hover { background: var(--primary-dark); transform: scale(1.1); }
                .p-avatar-edit input { display: none; }

                .p-hero-info { flex: 1; min-width: 150px; }
                .p-hero-name { font-size: 22px; font-weight: 700; color: var(--text-primary); line-height: 1.25; margin-bottom: 3px; }
                .p-hero-role { font-size: 11px; font-weight: 700; color: var(--primary); letter-spacing: 0.09em; text-transform: uppercase; margin-bottom: 3px; }
                .p-hero-email { font-size: 13px; color: var(--text-secondary); }

                .p-edit-btn { display: flex; align-items: center; gap: 7px; padding: 9px 18px; background: white; border: 1.5px solid var(--border); color: var(--text-secondary); font-family: 'Plus Jakarta Sans', sans-serif; font-size: 13px; font-weight: 600; border-radius: 10px; cursor: pointer; transition: all 0.2s; box-shadow: var(--shadow-sm); margin-left: auto; white-space: nowrap; }
                .p-edit-btn:hover { border-color: var(--primary); color: var(--primary); background: var(--primary-dim); }
                .p-edit-btn.save { background: var(--primary); border-color: var(--primary); color: white; box-shadow: 0 4px 14px rgba(0,176,155,0.35); }
                .p-edit-btn.save:hover { background: var(--primary-dark); }

                /* Grid */
                .p-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

                /* Cards */
                .p-card { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 22px; box-shadow: var(--shadow-sm); transition: box-shadow 0.2s, border-color 0.2s; }
                .p-card:hover { box-shadow: var(--shadow-md); border-color: var(--border-hover); }
                .p-card-header { display: flex; align-items: center; gap: 10px; margin-bottom: 18px; padding-bottom: 13px; border-bottom: 1px solid var(--border); }
                .p-icon { width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 13px; flex-shrink: 0; }
                .pi-green  { background: #d1fae5; color: #059669; }
                .pi-blue   { background: #dbeafe; color: #0984e3; }
                .pi-teal   { background: #ccfbf1; color: #0d9488; }
                .pi-red    { background: #fee2e2; color: #e05c5c; }
                .pi-amber  { background: #fef3c7; color: #d97706; }
                .p-card-title { font-size: 14px; font-weight: 700; color: var(--text-primary); }

                /* Fields */
                .p-field { margin-bottom: 13px; }
                .p-field:last-child { margin-bottom: 0; }
                .p-label { display: flex; align-items: center; gap: 5px; font-size: 10.5px; font-weight: 700; color: var(--text-muted); letter-spacing: 0.07em; text-transform: uppercase; margin-bottom: 5px; }
                .p-input, .p-textarea { width: 100%; background: var(--surface2); border: 1.5px solid var(--border); border-radius: var(--radius); color: var(--text-primary); font-family: 'Plus Jakarta Sans', sans-serif; font-size: 13.5px; font-weight: 500; padding: 9px 12px; transition: border-color 0.18s, box-shadow 0.18s, background 0.18s; outline: none; }
                .p-textarea { resize: vertical; min-height: 76px; line-height: 1.55; }
                .p-input:focus, .p-textarea:focus { border-color: var(--primary); box-shadow: 0 0 0 3px var(--primary-dim); background: white; }
                .p-input:disabled, .p-textarea:disabled { background: transparent; border: none; border-bottom: 1.5px solid var(--border); border-radius: 0; padding-left: 1px; color: var(--text-primary); cursor: default; }
                .p-input.locked { background: var(--surface2) !important; border: 1.5px solid var(--border) !important; border-radius: var(--radius) !important; padding: 9px 12px !important; color: var(--text-secondary) !important; cursor: not-allowed; }

                /* Custom Select */
                .cs-wrap { position: relative; width: 100%; }
                .cs-trigger { width: 100%; display: flex; align-items: center; gap: 8px; background: var(--surface2); border: 1.5px solid var(--border); border-radius: var(--radius); color: var(--text-primary); font-family: 'Plus Jakarta Sans', sans-serif; font-size: 13.5px; font-weight: 500; padding: 9px 12px; cursor: pointer; transition: all 0.18s; text-align: left; outline: none; }
                .cs-trigger:hover:not(:disabled) { border-color: var(--primary); background: white; }
                .cs-trigger.cs-open { border-color: var(--primary); box-shadow: 0 0 0 3px var(--primary-dim); background: white; }
                .cs-val { flex: 1; color: var(--text-primary); }
                .cs-placeholder { flex: 1; color: var(--text-muted); font-weight: 400; }
                .cs-arrow { font-size: 10px; color: var(--text-muted); transition: transform 0.2s; flex-shrink: 0; }
                .cs-arrow-up { transform: rotate(180deg); color: var(--primary); }
                .cs-dropdown { position: absolute; top: calc(100% + 5px); left: 0; right: 0; z-index: 9999; background: white; border: 1.5px solid var(--border); border-radius: var(--radius); box-shadow: 0 8px 30px rgba(0,0,0,0.11); overflow: hidden; animation: slideDown 0.15s ease; max-height: 220px; overflow-y: auto; }
                @keyframes slideDown { from { opacity:0; transform:translateY(-6px); } to { opacity:1; transform:translateY(0); } }
                .cs-dropdown::-webkit-scrollbar { width: 4px; }
                .cs-dropdown::-webkit-scrollbar-track { background: transparent; }
                .cs-dropdown::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }
                .cs-option { padding: 10px 14px; font-size: 13.5px; font-weight: 500; color: var(--text-primary); cursor: pointer; display: flex; align-items: center; justify-content: space-between; transition: background 0.1s; border-bottom: 1px solid #f3f4f3; }
                .cs-option:last-child { border-bottom: none; }
                .cs-option:hover { background: var(--primary-dim); color: var(--primary-dark); }
                .cs-selected { background: var(--primary-dim2); color: var(--primary-dark); font-weight: 600; }
                .cs-check { font-size: 12px; color: var(--primary); font-weight: 700; }
                .cs-disabled .cs-trigger { background: transparent; border: none; border-bottom: 1.5px solid var(--border); border-radius: 0; padding-left: 1px; cursor: default; pointer-events: none; }

                /* Date Picker */
                .dp-wrap { position: relative; width: 100%; }
                .dp-trigger { width: 100%; display: flex; align-items: center; gap: 8px; background: var(--surface2); border: 1.5px solid var(--border); border-radius: var(--radius); color: var(--text-primary); font-family: 'Plus Jakarta Sans', sans-serif; font-size: 13.5px; font-weight: 500; padding: 9px 12px; cursor: pointer; transition: all 0.18s; text-align: left; outline: none; }
                .dp-trigger:hover:not(:disabled) { border-color: var(--primary); background: white; }
                .dp-trigger.dp-open { border-color: var(--primary); box-shadow: 0 0 0 3px var(--primary-dim); background: white; }
                .dp-icon { font-size: 12px; color: var(--primary); flex-shrink: 0; }
                .dp-val { flex: 1; color: var(--text-primary); }
                .dp-placeholder { flex: 1; color: var(--text-muted); font-weight: 400; }
                .dp-arrow { font-size: 10px; color: var(--text-muted); transition: transform 0.2s; flex-shrink: 0; }
                .dp-arrow-up { transform: rotate(180deg); color: var(--primary); }

                .dp-popup { position: absolute; top: calc(100% + 5px); left: 0; z-index: 9999; background: white; border: 1.5px solid var(--border); border-radius: 16px; box-shadow: 0 12px 40px rgba(0,0,0,0.13); padding: 16px; width: 284px; animation: slideDown 0.15s ease; }

                .dp-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
                .dp-month-label { font-size: 14px; font-weight: 700; color: var(--text-primary); }
                .dp-nav { background: var(--surface2); border: 1px solid var(--border); border-radius: 8px; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 10px; color: var(--text-secondary); transition: all 0.15s; }
                .dp-nav:hover { background: var(--primary-dim); border-color: var(--primary); color: var(--primary); }

                .dp-weekdays { display: grid; grid-template-columns: repeat(7, 1fr); margin-bottom: 4px; }
                .dp-weekday { text-align: center; font-size: 11px; font-weight: 700; color: var(--text-muted); padding: 4px 0; }

                .dp-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 2px; }
                .dp-day { aspect-ratio: 1; border: none; background: none; border-radius: 8px; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 12.5px; font-weight: 500; color: var(--text-primary); cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.12s; position: relative; }
                .dp-day:hover:not(.dp-empty) { background: var(--primary-dim); color: var(--primary-dark); }
                .dp-today { color: var(--primary); font-weight: 700; }
                .dp-today::after { content: ''; width: 3px; height: 3px; border-radius: 50%; background: var(--primary); position: absolute; bottom: 3px; left: 50%; transform: translateX(-50%); }
                .dp-day-sel { background: var(--primary) !important; color: white !important; font-weight: 700; box-shadow: 0 2px 8px rgba(0,176,155,0.35); }
                .dp-empty { pointer-events: none; opacity: 0; }

                .dp-footer { margin-top: 10px; padding-top: 10px; border-top: 1px solid var(--border); display: flex; justify-content: flex-end; }
                .dp-clear { background: none; border: 1px solid #fecaca; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 12px; font-weight: 600; color: var(--red); cursor: pointer; padding: 5px 10px; border-radius: 7px; transition: background 0.15s; }
                .dp-clear:hover { background: #fee2e2; }

                .dp-disabled .dp-trigger { background: transparent; border: none; border-bottom: 1.5px solid var(--border); border-radius: 0; padding-left: 1px; cursor: default; pointer-events: none; }

                /* Date picker header clickable month/year */
                .dp-header-center { display: flex; align-items: center; gap: 4px; }
                .dp-hdr-btn { background: none; border: none; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14px; font-weight: 700; color: var(--text-primary); cursor: pointer; padding: 4px 8px; border-radius: 7px; transition: all 0.15s; display: flex; align-items: center; gap: 4px; }
                .dp-hdr-btn:hover { background: var(--primary-dim); color: var(--primary-dark); }
                .dp-hdr-btn::after { content: '▾'; font-size: 9px; color: var(--text-muted); }
                .dp-hdr-active { background: var(--primary-dim2); color: var(--primary-dark); }
                .dp-hdr-active::after { content: '▴'; color: var(--primary); }

                /* Month grid */
                .dp-month-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; padding: 4px 0 8px; }
                .dp-month-btn { padding: 8px 4px; border: 1.5px solid var(--border); background: var(--surface2); border-radius: 8px; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 12.5px; font-weight: 600; color: var(--text-secondary); cursor: pointer; transition: all 0.12s; }
                .dp-month-btn:hover { background: var(--primary-dim); border-color: var(--primary); color: var(--primary-dark); }
                .dp-month-sel { background: var(--primary) !important; border-color: var(--primary) !important; color: white !important; box-shadow: 0 2px 8px rgba(0,176,155,0.3); }

                /* Year list */
                .dp-year-list { max-height: 200px; overflow-y: auto; display: grid; grid-template-columns: repeat(3, 1fr); gap: 5px; padding: 4px 0 8px; }
                .dp-year-list::-webkit-scrollbar { width: 4px; }
                .dp-year-list::-webkit-scrollbar-track { background: transparent; }
                .dp-year-list::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }
                .dp-year-btn { padding: 8px 4px; border: 1.5px solid var(--border); background: var(--surface2); border-radius: 8px; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 12.5px; font-weight: 600; color: var(--text-secondary); cursor: pointer; transition: all 0.12s; }
                .dp-year-btn:hover { background: var(--primary-dim); border-color: var(--primary); color: var(--primary-dark); }
                .dp-year-sel { background: var(--primary) !important; border-color: var(--primary) !important; color: white !important; box-shadow: 0 2px 8px rgba(0,176,155,0.3); }

                /* Responsive */
                @media (max-width: 700px) {
                    .p-grid { grid-template-columns: 1fr; }
                    .p-addr-grid { grid-template-columns: 1fr !important; }
                    .p-hero-body { padding: 14px 16px 20px; }
                    .p-hero-row { gap: 12px; }
                    .p-edit-btn { margin-left: 0; width: 100%; justify-content: center; }
                    .dp-popup { width: min(284px, calc(100vw - 32px)); }
                }
            `}</style>

            <div className="profile-wrap">
                <div className="p-container">

                    {/* Hero */}
                    <div className="p-hero-card">
                        <div className="p-hero-banner" />
                        <div className="p-hero-body">
                            <div className="p-hero-row">
                                <div className="p-avatar-wrap">
                                    <div className="p-avatar-ring">
                                        <div className="p-avatar-inner">
                                            {formData.photo
                                                ? <img src={formData.photo} alt={user.name} />
                                                : <FaUser style={{ fontSize: 34, color: '#34d399' }} />
                                            }
                                        </div>
                                    </div>
                                    {isEditing && (
                                        <label className="p-avatar-edit" title="Change photo">
                                            <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
                                            {uploading ? '⟳' : '📷'}
                                        </label>
                                    )}
                                </div>
                                <div className="p-hero-info">
                                    <div className="p-hero-name">{user.name}</div>
                                    <div className="p-hero-role">{user.orgPosition || 'Member'}</div>
                                    <div className="p-hero-email">{user.email}</div>
                                </div>
                                <button className={`p-edit-btn${isEditing ? ' save' : ''}`} onClick={() => isEditing ? handleUpdate() : setIsEditing(true)}>
                                    {isEditing ? <><FaSave /> Save Profile</> : <><FaEdit /> Edit Profile</>}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Cards */}
                    <div className="p-grid">

                        {/* Personal */}
                        <div className="p-card">
                            <div className="p-card-header">
                                <div className="p-icon pi-green"><FaUser /></div>
                                <span className="p-card-title">Personal Information</span>
                            </div>
                            <PF label="Full Name">
                                <input className="p-input" type="text" value={formData.name || ''} onChange={e => setFormData(f => ({ ...f, name: e.target.value }))} disabled={!isEditing} />
                            </PF>
                            <PF label="Email">
                                <input className="p-input locked" type="email" value={user.email} disabled />
                            </PF>
                            <PF label="Mobile" icon={<FaPhone />}>
                                <input className="p-input" type="tel" value={formData.mobile || ''} onChange={e => setFormData(f => ({ ...f, mobile: e.target.value }))} disabled={!isEditing} />
                            </PF>
                            <PF label="Blood Group" icon={<FaTint style={{ color: '#e05c5c' }} />}>
                                <CustomSelect value={formData.bloodGroup || ''} onChange={set('bloodGroup')} options={bloodGroups} placeholder="Select blood group" disabled={!isEditing} />
                            </PF>
                            <PF label="Last Blood Donation" icon={<FaCalendar />}>
                                <CustomDatePicker value={formData.lastBloodDonation?.split('T')[0] || ''} onChange={set('lastBloodDonation')} disabled={!isEditing} />
                            </PF>
                        </div>

                        {/* Education */}
                        <div className="p-card">
                            <div className="p-card-header">
                                <div className="p-icon pi-blue"><FaSchool /></div>
                                <span className="p-card-title">Education</span>
                            </div>
                            <PF label="School">
                                <input className="p-input" type="text" value={formData.school || ''} onChange={e => setFormData(f => ({ ...f, school: e.target.value }))} disabled={!isEditing} />
                            </PF>
                            <PF label="SSC Batch">
                                <CustomSelect value={formData.sscBatch ? String(formData.sscBatch) : ''} onChange={set('sscBatch')} options={years} placeholder="Select SSC year" disabled={!isEditing} />
                            </PF>
                            <PF label="College">
                                <input className="p-input" type="text" value={formData.college || ''} onChange={e => setFormData(f => ({ ...f, college: e.target.value }))} disabled={!isEditing} />
                            </PF>
                            <PF label="HSC Batch">
                                <CustomSelect value={formData.hscBatch ? String(formData.hscBatch) : ''} onChange={set('hscBatch')} options={years} placeholder="Select HSC year" disabled={!isEditing} />
                            </PF>
                            <PF label="University" icon={<FaUniversity />}>
                                <input className="p-input" type="text" value={formData.university || ''} onChange={e => setFormData(f => ({ ...f, university: e.target.value }))} disabled={!isEditing} />
                            </PF>
                            <PF label="Department">
                                <input className="p-input" type="text" value={formData.department || ''} onChange={e => setFormData(f => ({ ...f, department: e.target.value }))} disabled={!isEditing} />
                            </PF>
                        </div>

                        {/* Profession */}
                        <div className="p-card">
                            <div className="p-card-header">
                                <div className="p-icon pi-teal"><FaBriefcase /></div>
                                <span className="p-card-title">Profession</span>
                            </div>
                            <PF label="Profession Type">
                                <CustomSelect value={formData.professionType || ''} onChange={set('professionType')} options={profTypes} placeholder="Select profession" disabled={!isEditing} />
                            </PF>
                            {formData.professionType === 'Teacher' && (<>
                                <PF label="Institution / School">
                                    <input className="p-input" type="text" value={formData.institution || ''} onChange={e => setFormData(f => ({ ...f, institution: e.target.value }))} disabled={!isEditing} />
                                </PF>
                                <PF label="Subject">
                                    <input className="p-input" type="text" value={formData.specialization || ''} onChange={e => setFormData(f => ({ ...f, specialization: e.target.value }))} disabled={!isEditing} placeholder="e.g., Mathematics, English" />
                                </PF>
                                <PF label="Designation">
                                    <input className="p-input" type="text" value={formData.designation || ''} onChange={e => setFormData(f => ({ ...f, designation: e.target.value }))} disabled={!isEditing} placeholder="e.g., Assistant Teacher, Head Teacher" />
                                </PF>
                            </>)}
                            {formData.professionType === 'Doctor' && (<>
                                <PF label="Hospital / Clinic">
                                    <input className="p-input" type="text" value={formData.institution || ''} onChange={e => setFormData(f => ({ ...f, institution: e.target.value }))} disabled={!isEditing} />
                                </PF>
                                <PF label="Specialization">
                                    <input className="p-input" type="text" value={formData.specialization || ''} onChange={e => setFormData(f => ({ ...f, specialization: e.target.value }))} disabled={!isEditing} placeholder="e.g., MBBS, Cardiologist, Surgeon" />
                                </PF>
                                <PF label="Designation">
                                    <input className="p-input" type="text" value={formData.designation || ''} onChange={e => setFormData(f => ({ ...f, designation: e.target.value }))} disabled={!isEditing} placeholder="e.g., Medical Officer, Consultant" />
                                </PF>
                            </>)}
                            {formData.professionType === 'Engineer' && (<>
                                <PF label="Company / Organization">
                                    <input className="p-input" type="text" value={formData.institution || ''} onChange={e => setFormData(f => ({ ...f, institution: e.target.value }))} disabled={!isEditing} />
                                </PF>
                                <PF label="Engineering Field">
                                    <input className="p-input" type="text" value={formData.specialization || ''} onChange={e => setFormData(f => ({ ...f, specialization: e.target.value }))} disabled={!isEditing} placeholder="e.g., Civil, Mechanical, Software" />
                                </PF>
                                <PF label="Designation">
                                    <input className="p-input" type="text" value={formData.designation || ''} onChange={e => setFormData(f => ({ ...f, designation: e.target.value }))} disabled={!isEditing} placeholder="e.g., Junior Engineer, Project Manager" />
                                </PF>
                            </>)}
                            {formData.professionType === 'Business' && (<>
                                <PF label="Business Name">
                                    <input className="p-input" type="text" value={formData.institution || ''} onChange={e => setFormData(f => ({ ...f, institution: e.target.value }))} disabled={!isEditing} />
                                </PF>
                                <PF label="Business Type">
                                    <input className="p-input" type="text" value={formData.specialization || ''} onChange={e => setFormData(f => ({ ...f, specialization: e.target.value }))} disabled={!isEditing} placeholder="e.g., Retail, Manufacturing, IT" />
                                </PF>
                                <PF label="Designation">
                                    <input className="p-input" type="text" value={formData.designation || ''} onChange={e => setFormData(f => ({ ...f, designation: e.target.value }))} disabled={!isEditing} placeholder="e.g., Owner, CEO, Partner" />
                                </PF>
                            </>)}
                            {formData.professionType === 'Private Sector' && (<>
                                <PF label="Company Name">
                                    <input className="p-input" type="text" value={formData.institution || ''} onChange={e => setFormData(f => ({ ...f, institution: e.target.value }))} disabled={!isEditing} />
                                </PF>
                                <PF label="Department">
                                    <input className="p-input" type="text" value={formData.specialization || ''} onChange={e => setFormData(f => ({ ...f, specialization: e.target.value }))} disabled={!isEditing} placeholder="e.g., IT, HR, Finance" />
                                </PF>
                                <PF label="Designation">
                                    <input className="p-input" type="text" value={formData.designation || ''} onChange={e => setFormData(f => ({ ...f, designation: e.target.value }))} disabled={!isEditing} placeholder="e.g., Manager, Executive, Officer" />
                                </PF>
                            </>)}
                            {formData.professionType === 'Army Person' && (<>
                                <PF label="Force / Branch">
                                    <input className="p-input" type="text" value={formData.institution || ''} onChange={e => setFormData(f => ({ ...f, institution: e.target.value }))} disabled={!isEditing} placeholder="e.g., Bangladesh Army, Navy, Air Force" />
                                </PF>
                                <PF label="Rank">
                                    <input className="p-input" type="text" value={formData.designation || ''} onChange={e => setFormData(f => ({ ...f, designation: e.target.value }))} disabled={!isEditing} placeholder="e.g., Captain, Major, Lieutenant" />
                                </PF>
                                <PF label="Unit / Regiment">
                                    <input className="p-input" type="text" value={formData.specialization || ''} onChange={e => setFormData(f => ({ ...f, specialization: e.target.value }))} disabled={!isEditing} />
                                </PF>
                            </>)}
                            {formData.professionType === 'Govt Job' && (<>
                                <PF label="Department / Ministry">
                                    <input className="p-input" type="text" value={formData.institution || ''} onChange={e => setFormData(f => ({ ...f, institution: e.target.value }))} disabled={!isEditing} />
                                </PF>
                                <PF label="Designation / Post">
                                    <input className="p-input" type="text" value={formData.designation || ''} onChange={e => setFormData(f => ({ ...f, designation: e.target.value }))} disabled={!isEditing} placeholder="e.g., Assistant Commissioner, BCS Cadre" />
                                </PF>
                                <PF label="Grade / Scale">
                                    <input className="p-input" type="text" value={formData.specialization || ''} onChange={e => setFormData(f => ({ ...f, specialization: e.target.value }))} disabled={!isEditing} />
                                </PF>
                            </>)}
                            {formData.professionType === 'Probasi' && (
                                <PF label="Country">
                                    <input className="p-input" type="text" value={formData.institution || ''} onChange={e => setFormData(f => ({ ...f, institution: e.target.value }))} disabled={!isEditing} />
                                </PF>
                            )}
                        </div>

                        {/* Organization */}
                        <div className="p-card">
                            <div className="p-card-header">
                                <div className="p-icon pi-amber"><FaBriefcase /></div>
                                <span className="p-card-title">Organization — The Dreamers</span>
                            </div>
                            <PF label="Position / Designation">
                                <input className="p-input" type="text" value={formData.orgPosition || ''} onChange={e => setFormData(f => ({ ...f, orgPosition: e.target.value }))} disabled={!isEditing} placeholder="e.g., Member, Volunteer, Executive" />
                            </PF>
                            <PF label="Branch">
                                <input className="p-input" type="text" value={formData.orgBranch || ''} onChange={e => setFormData(f => ({ ...f, orgBranch: e.target.value }))} disabled={!isEditing} />
                            </PF>
                            <PF label="Joining Date" icon={<FaCalendar />}>
                                <CustomDatePicker value={formData.orgJoinDate?.split('T')[0] || ''} onChange={set('orgJoinDate')} disabled={!isEditing} />
                            </PF>
                        </div>

                        {/* Address */}
                        <div className="p-card" style={{ gridColumn: '1 / -1' }}>
                            <div className="p-card-header">
                                <div className="p-icon pi-red"><FaMapMarkerAlt /></div>
                                <span className="p-card-title">Address</span>
                            </div>
                            <div className="p-addr-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <PF label="Permanent Address">
                                    <textarea className="p-textarea" value={formData.permanentAddress || ''} onChange={e => setFormData(f => ({ ...f, permanentAddress: e.target.value }))} disabled={!isEditing} rows="3" />
                                </PF>
                                <PF label="Current Address">
                                    <textarea className="p-textarea" value={formData.currentAddress || ''} onChange={e => setFormData(f => ({ ...f, currentAddress: e.target.value }))} disabled={!isEditing} rows="3" />
                                </PF>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;

