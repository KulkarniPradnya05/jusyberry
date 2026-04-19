"use client";

import { useState, FormEvent } from "react";
import { useCart } from "@/context/CartContext";

type CheckoutModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type PaymentMethod = "UPI" | "CARD" | "NET_BANKING" | "COD";

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { items, total, gst, grandTotal } = useCart();
  
  const [method, setMethod] = useState<PaymentMethod>("UPI");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    instructions: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [isGatewayOpen, setIsGatewayOpen] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  
  // Stable random order ID
  const [orderId] = useState(() => "ORD-" + Math.floor(Math.random() * 1000000000));

  // Delivery charge rule (Free over ₹599)
  const deliveryCharge = total > 599 || total === 0 ? 0 : 50.00;
  const finalAmount = Math.max(0, grandTotal + deliveryCharge - discount);

  // Delivery estimation (3 days from now)
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 3);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Valid email is required.";
    if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "10-digit phone number is required.";
    if (!formData.address.trim()) newErrors.address = "Address is required.";
    if (!formData.city.trim()) newErrors.city = "City is required.";
    if (!formData.state.trim()) newErrors.state = "State is required.";
    if (!/^\d{5,6}$/.test(formData.pincode)) newErrors.pincode = "Valid pincode is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheckout = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsGatewayOpen(true);
      setIsProcessing(true);
      
      // Simulate Secure Gateway (Razorpay/Stripe tokenization flow)
      setTimeout(() => {
        setIsProcessing(false);
        setIsGatewayOpen(false);
        // 10% chance of failure for realistic demonstration
        if (Math.random() > 0.9) {
          setIsFailed(true);
        } else {
          setIsSuccess(true);
        }
      }, 3000);
    }
  };

  const applyCoupon = () => {
    if (coupon.toUpperCase() === "STRAWBERRY10") {
      setDiscount(total * 0.1);
    } else {
      alert("Invalid or expired coupon code.");
    }
  };

  if (!isOpen) return null;

  // --- FAILURE STATE UI ---
  if (isFailed) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#050505]/95 backdrop-blur-3xl transition-opacity animate-in fade-in duration-500">
        <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-10 max-w-md w-full text-center shadow-[0_0_80px_rgba(255,23,68,0.1)]">
          <div className="w-20 h-20 bg-white/5 text-white rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Payment Failed</h2>
          <p className="text-white/60 mb-8 text-sm">
            We couldn't process your payment securely. Please check your card details or try a different payment method.
          </p>
          <div className="space-y-4">
            <button onClick={() => { setIsFailed(false); handleCheckout(new Event('submit') as any); }} className="w-full py-4 bg-[#FF1744] text-white font-bold uppercase tracking-widest text-xs rounded-full hover:bg-[#D50032] transition-colors shadow-[0_0_20px_rgba(255,23,68,0.3)]">
              Retry Payment
            </button>
            <button onClick={() => setIsFailed(false)} className="w-full py-4 bg-transparent border border-white/20 text-white font-bold uppercase tracking-widest text-xs rounded-full hover:bg-white/5 transition-colors">
              Change Method
            </button>
          </div>
        </div>
      </div>
    );
  }

  const printReceipt = () => {
    const printWindow = window.open('', '_blank', 'height=800,width=800');
    if (printWindow) {
      
      const orderDate = new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
      
      // Compute item rows dynamically
      let tableRows = '';
      let index = 1;
      items.forEach(item => {
        const rowTotal = item.price * item.quantity;
        // Assume 18% GST built into price for simplicity on the receipt breakdown, or show tax mathematically
        tableRows += `
          <tr>
            <td>${index++}</td>
            <td style="text-align: left;"><strong>${item.name}</strong><br/><span style="color: #555; font-size: 10px;">HSN: 22029920</span></td>
            <td>₹${item.price.toFixed(2)}</td>
            <td>${item.quantity}</td>
            <td>18%</td>
            <td>₹${rowTotal.toFixed(2)}</td>
          </tr>
        `;
      });

      printWindow.document.write(`
        <html>
          <head>
            <title>Tax Invoice - ${orderId}</title>
            <style>
              body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background: #ffffff; color: #000000; padding: 40px; margin: 0; font-size: 12px; }
              .invoice-container { width: 100%; max-width: 800px; margin: 0 auto; border: 1px solid #ddd; padding: 40px; }
              .header-title { font-size: 20px; font-weight: 800; text-align: center; margin: 0 0 5px 0; text-transform: uppercase; }
              .header-subtitle { font-size: 10px; text-align: center; color: #666; margin-bottom: 30px; }
              
              .flex-row { display: flex; justify-content: space-between; margin-bottom: 20px; }
              .box { width: 48%; border: 1px solid #eee; padding: 15px; background: #fafafa; }
              .box-title { font-weight: bold; margin: 0 0 10px 0; font-size: 11px; text-transform: uppercase; color: #555; border-bottom: 1px solid #ddd; padding-bottom: 5px; }
              p { margin: 0 0 5px 0; line-height: 1.4; }
              
              .meta-table { width: 100%; margin-bottom: 30px; border-collapse: collapse; }
              .meta-table td { padding: 5px 0; }
              
              .items-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
              .items-table th { background: #f4f4f4; border: 1px solid #ddd; padding: 10px; text-align: right; font-size: 11px; }
              .items-table th:nth-child(1), .items-table th:nth-child(2) { text-align: left; }
              .items-table td { border: 1px solid #ddd; padding: 10px; text-align: right; }
              .items-table td:nth-child(1), .items-table td:nth-child(2) { text-align: left; }
              
              .totals-box { width: 100%; display: flex; justify-content: flex-end; }
              .totals-table { width: 300px; border-collapse: collapse; }
              .totals-table td { padding: 8px; border: 1px solid #ddd; text-align: right; }
              .totals-table td.label { font-weight: bold; background: #fafafa; }
              
              .footer { margin-top: 50px; text-align: right; font-size: 10px; color: #333; }
              .signature-line { width: 150px; border-top: 1px solid #000; display: inline-block; margin-top: 40px; padding-top: 5px; font-weight: bold; text-align: center; }
              
              @media print {
                body { padding: 0; }
                .invoice-container { border: none; padding: 0; max-width: 100%; }
              }
            </style>
          </head>
          <body>
            <div class="invoice-container">
              <h1 class="header-title">Tax Invoice</h1>
              <p class="header-subtitle">(Original for Recipient)</p>
              
              <div class="flex-row">
                <div class="box">
                  <p class="box-title">Sold By:</p>
                  <p><strong>Strawberry Premium Ltd.</strong></p>
                  <p>145 Cold-Pressed Avenue</p>
                  <p>Orchard District, SF 94103</p>
                  <p>GSTIN: 27AABCU9603R1ZX</p>
                </div>
                <div class="box">
                  <p class="box-title">Shipping Address:</p>
                  <p><strong>${formData.name}</strong></p>
                  <p>${formData.address}</p>
                  <p>${formData.city}, ${formData.state} - ${formData.pincode}</p>
                  <p>Phone: ${formData.phone}</p>
                </div>
              </div>
              
              <table class="meta-table">
                <tr>
                  <td><strong>Order Number:</strong> ${orderId}</td>
                  <td style="text-align: right;"><strong>Invoice Date:</strong> ${orderDate}</td>
                </tr>
                <tr>
                  <td><strong>Payment Method:</strong> ${method}</td>
                  <td style="text-align: right;"><strong>Delivery ETA:</strong> ${deliveryDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                </tr>
              </table>
              
              <table class="items-table">
                <thead>
                  <tr>
                    <th style="width: 5%">#</th>
                    <th style="width: 45%">Product Description</th>
                    <th>Unit Price</th>
                    <th>Qty</th>
                    <th>Tax Rate</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  ${tableRows}
                </tbody>
              </table>
              
              <div class="totals-box">
                <table class="totals-table">
                  <tr><td class="label">Subtotal</td><td>₹${total.toFixed(2)}</td></tr>
                  <tr><td class="label">Delivery Charge</td><td>${deliveryCharge === 0 ? "FREE" : "₹" + deliveryCharge.toFixed(2)}</td></tr>
                  <tr><td class="label">IGST (18%)</td><td>₹${gst.toFixed(2)}</td></tr>
                  ${discount > 0 ? `<tr><td class="label" style="color: green;">Discount</td><td style="color: green;">-₹${discount.toFixed(2)}</td></tr>` : ''}
                  <tr><td class="label" style="font-size: 14px; font-weight: 900;">Grand Total</td><td style="font-size: 14px; font-weight: 900;">₹${finalAmount.toFixed(2)}</td></tr>
                </table>
              </div>
              
              <div class="footer">
                <p>For Strawberry Premium Ltd.</p>
                <div class="signature-line">Authorized Signatory</div>
              </div>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      // Ensure complex table styles process before printing
      setTimeout(() => {
        printWindow.print();
      }, 500);
    }
  };

  // --- SUCCESS STATE UI ---
  if (isSuccess) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#050505]/95 backdrop-blur-3xl transition-opacity animate-in fade-in duration-700">
        <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 md:p-12 max-w-lg w-full text-center shadow-[0_0_100px_rgba(255,23,68,0.15)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#FF1744] to-[#FF6B9D]" />
          <div className="w-24 h-24 bg-[#FF1744]/10 text-[#FF1744] rounded-full flex items-center justify-center mx-auto mb-6 border border-[#FF1744]/20 shadow-[inset_0_0_20px_rgba(255,23,68,0.2)] animate-pulse">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Order Confirmed 🎉</h2>
          <p className="text-[#FF1744] font-mono text-sm mb-6 tracking-widest">ORDER #{orderId}</p>
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 mb-8 text-left">
            <p className="text-white/60 mb-2 text-sm tracking-wide">Estimated Delivery</p>
            <p className="text-white font-semibold text-lg">{deliveryDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
            <div className="w-full h-[1px] bg-white/10 my-4" />
            <p className="text-white/60 mb-1 text-xs">Receipt sent securely to:</p>
            <p className="text-white text-sm">{formData.email}</p>
          </div>
          <div className="space-y-3">
            <button onClick={printReceipt} className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest text-xs rounded-full hover:bg-gray-200 transition-colors">
              Download Receipt
            </button>
            <button onClick={() => { setIsSuccess(false); onClose(); window.location.reload(); }} className="w-full py-4 bg-transparent text-white/40 hover:text-white font-bold uppercase tracking-widest text-xs rounded-full transition-colors">
              Return to Store
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- SECURE PAYMENT GATEWAY MODAL (Razorpay Mock SDK) ---
  if (isGatewayOpen) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <div className="bg-white rounded-xl w-full max-w-[400px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] animate-in zoom-in-95 duration-200 border border-gray-200">
          
          {/* Razorpay Header Component */}
          <div className="bg-[#0B1E59] p-5 flex items-center justify-between">
             <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/10 rounded overflow-hidden flex items-center justify-center backdrop-blur-sm border border-white/20">
                   <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
                <div>
                   <h3 className="text-white font-semibold text-sm leading-tight tracking-wide">Strawberry.</h3>
                   <span className="text-white/60 text-[10px] uppercase font-bold tracking-widest">{method} Payment</span>
                </div>
             </div>
             <div className="text-right">
                <p className="text-white/60 text-[10px] uppercase font-bold tracking-widest">Amount</p>
                <p className="text-white font-bold text-lg leading-tight">₹{finalAmount.toFixed(2)}</p>
             </div>
          </div>
          
          {/* Razorpay Loading Body Component */}
          <div className="p-10 flex flex-col items-center justify-center bg-white min-h-[300px]">
             
             {/* Progress Animation Wrapper */}
             <div className="relative w-16 h-16 mb-6 flex items-center justify-center">
                 <svg className="animate-spin absolute inset-0 w-full h-full text-[#3385ff]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle><path className="opacity-100" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                 <div className="w-6 h-6 bg-[#3385ff]/10 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-[#3385ff] rounded-full"></div>
                 </div>
             </div>
             
             <h4 className="text-gray-900 font-bold text-lg mb-1">Authenticating...</h4>
             <p className="text-gray-500 text-xs text-center max-w-[250px] leading-relaxed">
               Please do not close this window or press the back button. Processing secure token exchange.
             </p>
          </div>
          
          {/* Razorpay Standard Footer */}
          <div className="bg-[#f9f9f9] py-3 px-5 border-t border-gray-100 flex items-center justify-between">
             <div className="flex items-center gap-1.5 opacity-60">
                <svg className="w-3 h-3 text-gray-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" /></svg>
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Secured by Razorpay</span>
             </div>
             <span className="text-[10px] text-[#3385ff] font-bold uppercase tracking-widest bg-[#3385ff]/10 px-2 py-0.5 rounded-sm">Test Mode</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-12 transition-all duration-500 bg-black/80 backdrop-blur-xl animate-in fade-in zoom-in-95`}>
      
      <div className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-[#0a0a0a] rounded-[2rem] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] grid grid-cols-1 lg:grid-cols-2">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-50 text-white/40 hover:text-[#FF1744] transition-colors p-2 bg-black/50 rounded-full backdrop-blur-md"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        {/* Left Side: Order Summary & Payment Options */}
        <div className="p-8 lg:p-12 bg-[#050505] border-r border-white/5 flex flex-col order-2 lg:order-1">
          <h2 className="text-2xl font-semibold text-white tracking-wide mb-8 shrink-0">Order Summary</h2>
          
          <div className="flex-1 overflow-y-auto mb-8 pr-2 space-y-4 max-h-[300px]">
            {items.map(item => (
              <div key={item.id} className="flex gap-4 items-center">
                <div className="w-16 h-16 bg-white/[0.02] rounded-xl p-2 border border-white/5 shrink-0 flex items-center justify-center">
                  <img src={item.img} alt={item.name} className="w-full h-full object-contain" />
                </div>
                <div className="flex-1">
                  <h4 className="text-white text-sm font-medium">{item.name}</h4>
                  <p className="text-white/40 text-xs mt-1">Qty: {item.quantity}</p>
                </div>
                <span className="text-white text-sm font-mono">₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="space-y-3 mb-8 pt-6 border-t border-white/10 shrink-0">
            <div className="flex justify-between text-white/60 text-sm"><span className="font-light">Subtotal</span><span>₹{total.toFixed(2)}</span></div>
            <div className="flex justify-between text-white/60 text-sm"><span className="font-light">GST (18%)</span><span>₹{gst.toFixed(2)}</span></div>
            <div className="flex justify-between text-white/60 text-sm">
                <span className="font-light">Delivery</span>
                <span className={deliveryCharge === 0 ? "text-green-400" : ""}>{deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge.toFixed(2)}`}</span>
            </div>
            {discount > 0 && (
               <div className="flex justify-between text-green-400 text-sm">
                  <span className="font-light">Coupon Discount</span>
                  <span>-₹{discount.toFixed(2)}</span>
               </div>
            )}
            <div className="flex justify-between text-white text-xl font-bold pt-4 mt-4 border-t border-white/10">
              <span>Total Payable</span>
              <span className="text-[#FF1744]">₹{finalAmount.toFixed(2)}</span>
            </div>
          </div>

          {/* Coupon Code Section */}
          <div className="mb-8 pt-6 border-t border-white/10 shrink-0">
             <label className="text-white/60 text-xs tracking-widest uppercase mb-2 block">Gift Card or Coupon</label>
             <div className="flex gap-2">
                <input 
                  type="text" 
                  value={coupon}
                  onChange={e => setCoupon(e.target.value)}
                  placeholder="Enter code" 
                  className="flex-1 bg-white/[0.02] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-colors uppercase"
                />
                <button 
                  onClick={applyCoupon}
                  type="button"
                  className="px-6 bg-white/5 border border-white/10 rounded-lg text-white text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors"
                >
                  Apply
                </button>
             </div>
             {discount > 0 && <p className="text-green-400 text-xs mt-2 flex items-center gap-1"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg> Coupon applied successfully!</p>}
          </div>

          {/* Payment Methods */}
          <div className="shrink-0">
            <h3 className="text-white/80 text-sm font-semibold tracking-widest uppercase mb-4">Payment Method</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: "UPI", label: "UPI", desc: "GPay, PhonePe" },
                { id: "CARD", label: "Card", desc: "Credit / Debit" },
                { id: "NET_BANKING", label: "Net Banking", desc: "Direct Bank Transfer" },
                { id: "COD", label: "COD", desc: "Pay on Delivery" }
              ].map(opt => (
                <div 
                  key={opt.id}
                  onClick={() => setMethod(opt.id as PaymentMethod)}
                  className={`cursor-pointer p-4 rounded-xl border transition-all duration-300 ${method === opt.id ? 'bg-[#FF1744]/10 border-[#FF1744]' : 'bg-white/[0.02] border-white/10 hover:border-white/30'}`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`w-3 h-3 rounded-full border flex items-center justify-center transition-colors ${method === opt.id ? 'border-[#FF1744]' : 'border-white/40'}`}>
                      {method === opt.id && <div className="w-1.5 h-1.5 bg-[#FF1744] rounded-full" />}
                    </div>
                    <span className={`text-sm font-bold ${method === opt.id ? 'text-[#FF1744]' : 'text-white'}`}>{opt.label}</span>
                  </div>
                  <p className="text-[10px] text-white/40 ml-5">{opt.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Side: Shipping Form */}
        <form onSubmit={handleCheckout} className="p-8 lg:p-12 flex flex-col order-1 lg:order-2">
          <h2 className="text-2xl font-semibold text-white tracking-wide mb-8">Shipping Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            <div className="space-y-1">
              <label className="text-xs text-white/60 tracking-widest uppercase">Full Name</label>
              <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className={`w-full bg-white/[0.02] border ${errors.name ? 'border-[#FF1744]' : 'border-white/10'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-colors`} placeholder="Jane Doe" />
              {errors.name && <p className="text-[#FF1744] text-[10px] mt-1">{errors.name}</p>}
            </div>
            
            <div className="space-y-1">
              <label className="text-xs text-white/60 tracking-widest uppercase">Email Address</label>
              <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className={`w-full bg-white/[0.02] border ${errors.email ? 'border-[#FF1744]' : 'border-white/10'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-colors`} placeholder="jane@example.com" />
              {errors.email && <p className="text-[#FF1744] text-[10px] mt-1">{errors.email}</p>}
            </div>

            <div className="space-y-1 md:col-span-2">
              <label className="text-xs text-white/60 tracking-widest uppercase">Phone Number</label>
              <input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value.replace(/\D/g, '')})} maxLength={10} className={`w-full bg-white/[0.02] border ${errors.phone ? 'border-[#FF1744]' : 'border-white/10'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-colors`} placeholder="10-digit mobile number" />
              {errors.phone && <p className="text-[#FF1744] text-[10px] mt-1">{errors.phone}</p>}
            </div>

            <div className="space-y-1 md:col-span-2">
              <label className="text-xs text-white/60 tracking-widest uppercase">Delivery Address</label>
              <textarea value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} rows={2} className={`w-full bg-white/[0.02] border ${errors.address ? 'border-[#FF1744]' : 'border-white/10'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-colors`} placeholder="House/Flat No., Building Name, Street" />
              {errors.address && <p className="text-[#FF1744] text-[10px] mt-1">{errors.address}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-xs text-white/60 tracking-widest uppercase">City</label>
              <input type="text" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className={`w-full bg-white/[0.02] border ${errors.city ? 'border-[#FF1744]' : 'border-white/10'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-colors`} placeholder="City" />
              {errors.city && <p className="text-[#FF1744] text-[10px] mt-1">{errors.city}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-xs text-white/60 tracking-widest uppercase">State</label>
              <input type="text" value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})} className={`w-full bg-white/[0.02] border ${errors.state ? 'border-[#FF1744]' : 'border-white/10'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-colors`} placeholder="State" />
              {errors.state && <p className="text-[#FF1744] text-[10px] mt-1">{errors.state}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-xs text-white/60 tracking-widest uppercase">Pincode</label>
              <input type="text" value={formData.pincode} onChange={e => setFormData({...formData, pincode: e.target.value.replace(/\D/g, '')})} maxLength={6} className={`w-full bg-white/[0.02] border ${errors.pincode ? 'border-[#FF1744]' : 'border-white/10'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-colors`} placeholder="Zip / Pincode" />
              {errors.pincode && <p className="text-[#FF1744] text-[10px] mt-1">{errors.pincode}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-xs text-white/60 tracking-widest uppercase flex items-center justify-between">
                Special Instructions <span className="text-[9px] text-white/30 hidden sm:block">Optional</span>
              </label>
              <input type="text" value={formData.instructions} onChange={e => setFormData({...formData, instructions: e.target.value})} className="w-full bg-white/[0.02] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-colors" placeholder="e.g. Leave at door" />
            </div>
          </div>

          <button 
            type="submit"
            disabled={isProcessing}
            className={`w-full mt-auto py-5 relative overflow-hidden rounded-xl font-bold text-sm tracking-[0.2em] uppercase transition-all duration-300 ${isProcessing ? 'bg-[#333] cursor-wait' : 'bg-[#111] shadow-[0_0_20px_rgba(255,23,68,0.2)] hover:shadow-[0_0_40px_rgba(255,23,68,0.6)]'}`}
          >
            {!isProcessing && <div className="absolute inset-0 bg-gradient-to-r from-[#FF1744] to-[#FF6B9D] ease-out duration-300 opacity-90 hover:opacity-100"></div>}
            <span className="relative z-10 flex items-center justify-center gap-2 text-white">
              {isProcessing ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Processing...
                </>
              ) : (
                <>Pay ₹{finalAmount.toFixed(2)} securely</>
              )}
            </span>
          </button>
          
          <p className="text-[10px] text-center text-white/30 mt-4 flex items-center justify-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            256-bit Encrypted Checkout
          </p>
        </form>

      </div>
    </div>
  );
}
