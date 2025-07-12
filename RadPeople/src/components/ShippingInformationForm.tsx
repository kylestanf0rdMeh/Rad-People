import React from 'react';

const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'
];

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 12px',
  margin: '6px 0 16px 0',
  border: '1px solid #d1d5db',
  borderRadius: 0,
  fontSize: 16,
  background: '#fafbfc',
  color: '#222',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border 0.2s',
  fontFamily: 'system-ui, sans-serif',
};

const labelStyle: React.CSSProperties = {
  fontWeight: 500,
  fontSize: 14,
  marginBottom: 2,
  color: '#222',
  display: 'block',
  fontFamily: 'system-ui, sans-serif',
};

export interface ShippingInfo {
  name: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  email: string;
}

interface ShippingInformationFormProps {
  shipping: ShippingInfo;
  onChange: (field: keyof ShippingInfo, value: string) => void;
  fieldErrors?: Partial<Record<keyof ShippingInfo, string>>;
}

const errorInputStyle: React.CSSProperties = {
  ...inputStyle,
  border: '2px solid #e00',
};

const ShippingInformationForm: React.FC<ShippingInformationFormProps> = ({ shipping, onChange, fieldErrors = {} }) => (
  <div>
    <h3 style={{ fontWeight: 600, fontSize: 18, marginBottom: 12, color: '#222' }}>Shipping Information</h3>
    <label style={labelStyle}>Full Name</label>
    <input
      style={fieldErrors.name ? errorInputStyle : inputStyle}
      name="name"
      type="text"
      autoComplete="name"
      value={shipping.name}
      onChange={e => onChange('name', e.target.value)}
      required
    />
    {fieldErrors.name && <div style={{ color: '#e00', fontSize: 14, fontWeight: 500, marginTop: -15, marginBottom: 10 }}>{fieldErrors.name}</div>}

    <label style={labelStyle}>Email</label>
    <input
      style={fieldErrors.email ? errorInputStyle : inputStyle}
      name="email"
      type="email"
      autoComplete="email"
      value={shipping.email}
      onChange={e => onChange('email', e.target.value)}
      required
    />
    {fieldErrors.email && <div style={{ color: '#e00', fontSize: 14, fontWeight: 500, marginTop: -15, marginBottom: 10 }}>{fieldErrors.email}</div>}

    <label style={labelStyle}>Address Line 1</label>
    <input
      style={fieldErrors.address1 ? errorInputStyle : inputStyle}
      name="address1"
      type="text"
      autoComplete="address-line1"
      value={shipping.address1}
      onChange={e => onChange('address1', e.target.value)}
      required
    />
    {fieldErrors.address1 && <div style={{ color: '#e00', fontSize: 14, fontWeight: 500, marginTop: -15, marginBottom: 10 }}>{fieldErrors.address1}</div>}


    <label style={labelStyle}>Address Line 2</label>
    <input
      style={inputStyle}
      name="address2"
      type="text"
      autoComplete="address-line2"
      value={shipping.address2}
      onChange={e => onChange('address2', e.target.value)}
    />

    <div style={{ display: 'flex', gap: 12 }}>
      <div style={{ flex: 2 }}>
        <label style={labelStyle}>City</label>
        <input
          style={fieldErrors.city ? errorInputStyle : inputStyle}
          name="city"
          type="text"
          autoComplete="address-level2"
          value={shipping.city}
          onChange={e => onChange('city', e.target.value)}
          required
        />
        {fieldErrors.city && <div style={{ color: '#e00', fontSize: 14, fontWeight: 500, marginTop: -15, marginBottom: 10 }}>{fieldErrors.city}</div>}
      </div>
      <div style={{ flex: 1 }}>
        <label style={labelStyle}>State</label>
        <select
          style={fieldErrors.state ? { ...inputStyle, border: '2px solid #e00',  paddingRight: 24 } : { ...inputStyle, paddingRight: 24 }}
          name="state"
          value={shipping.state}
          onChange={e => onChange('state', e.target.value)}
          required
        >
          <option value="">State</option>
          {US_STATES.map((st) => (
            <option key={st} value={st}>{st}</option>
          ))}
        </select>
        {fieldErrors.state && <div style={{ color: '#e00', fontSize: 14, fontWeight: 500, marginTop: -15, marginBottom: 10 }}>{fieldErrors.state}</div>}
      </div>
      <div style={{ flex: 1 }}>
        <label style={labelStyle}>ZIP</label>
        <input
          style={fieldErrors.zip ? errorInputStyle : inputStyle}
          name="zip"
          type="text"
          autoComplete="postal-code"
          value={shipping.zip}
          onChange={e => onChange('zip', e.target.value)}
          required
        />
        {fieldErrors.zip && <div style={{ color: '#e00', fontSize: 14, fontWeight: 500, marginTop: -15, marginBottom: 10 }}>{fieldErrors.zip}</div>}
      </div>
    </div>
  </div>
);

export default ShippingInformationForm;