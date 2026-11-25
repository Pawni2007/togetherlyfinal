// Reusable tab buttons. "variant" switches between underlined tabs (page sections)
// and a compact segmented control (sorting and scope pickers).
export default function Tabs({ tabs, active, onChange, label, variant = "line" }) {
  return (
    <div className={`tabs tabs--${variant}`} role="tablist" aria-label={label}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={active === tab.id}
          className="tabs__tab"
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
          {tab.count !== undefined && <span className="tabs__count">{tab.count}</span>}
        </button>
      ))}
    </div>
  );
}
