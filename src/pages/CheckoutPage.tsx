import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, Truck, Lock, ChevronRight, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [orderComplete, setOrderComplete] = useState(false);

  const shipping = totalPrice >= 50 ? 0 : 9.99;
  const tax = totalPrice * 0.08;
  const total = totalPrice + shipping + tax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      setOrderComplete(true);
      clearCart();
    }
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-gray-800 rounded-2xl shadow-xl p-8 max-w-md w-full text-center border border-gray-700">
          <div className="w-20 h-20 bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">¡Pedido Completado!</h1>
          <p className="text-gray-400 mb-6">
            Gracias por tu compra. Recibirás un correo con los detalles de tu pedido.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Número de pedido: <span className="font-semibold text-white">#PF-{Date.now()}</span>
          </p>
          <Link
            to="/"
            className="block w-full bg-[#cee741] text-gray-900 py-3 rounded-xl font-semibold hover:bg-[#b5cc1a] transition-colors"
          >
            Volver al Inicio
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Tu carrito está vacío</h2>
          <Link to="/products" className="text-[#cee741] hover:underline">
            Explorar productos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-[#cee741] rounded-lg flex items-center justify-center">
                <span className="text-gray-900 font-bold text-xl">PF</span>
              </div>
              <span className="text-xl font-bold text-white">PuntosFit</span>
            </Link>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Lock className="w-4 h-4" />
              Pago seguro
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Steps */}
        <div className="flex items-center justify-center mb-12">
          {['Información', 'Envío', 'Pago'].map((label, index) => (
            <div key={label} className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full font-semibold text-sm ${
                step > index + 1 ? 'bg-green-500 text-white' :
                step === index + 1 ? 'bg-[#cee741] text-gray-900' : 'bg-gray-700 text-gray-400'
              }`}>
                {step > index + 1 ? <Check className="w-4 h-4" /> : index + 1}
              </div>
              <span className={`ml-2 text-sm font-medium ${
                step >= index + 1 ? 'text-white' : 'text-gray-500'
              }`}>{label}</span>
              {index < 2 && (
                <ChevronRight className="w-5 h-5 text-gray-600 mx-4" />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-gray-800 rounded-2xl shadow-sm p-6 space-y-6 border border-gray-700">
              {step === 1 && (
                <>
                  <h2 className="text-xl font-semibold text-white mb-4">Información de Contacto</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Nombre</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-gray-600 bg-gray-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#cee741] placeholder-gray-400"
                        placeholder="Tu nombre"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Apellido</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-gray-600 bg-gray-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#cee741] placeholder-gray-400"
                        placeholder="Tu apellido"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 border border-gray-600 bg-gray-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#cee741] placeholder-gray-400"
                      placeholder="tu@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Teléfono</label>
                    <input
                      type="tel"
                      required
                      className="w-full px-4 py-3 border border-gray-600 bg-gray-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#cee741] placeholder-gray-400"
                      placeholder="+1 234 567 890"
                    />
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <h2 className="text-xl font-semibold text-white mb-4">Dirección de Envío</h2>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Dirección</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-600 bg-gray-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#cee741] placeholder-gray-400"
                      placeholder="Calle y número"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Ciudad</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-gray-600 bg-gray-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#cee741] placeholder-gray-400"
                        placeholder="Tu ciudad"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Código Postal</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-gray-600 bg-gray-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#cee741] placeholder-gray-400"
                        placeholder="12345"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">País</label>
                    <select className="w-full px-4 py-3 border border-gray-600 bg-gray-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#cee741]">
                      <option>México</option>
                      <option>Colombia</option>
                      <option>Argentina</option>
                      <option>España</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-[#cee741]/20 rounded-xl border border-[#cee741]/30">
                    <Truck className="w-6 h-6 text-[#cee741]" />
                    <div>
                      <p className="font-medium text-white">Envío estándar (5-7 días)</p>
                      <p className="text-sm text-gray-400">
                        {shipping === 0 ? '¡Gratis!' : `$${shipping.toFixed(2)}`}
                      </p>
                    </div>
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <h2 className="text-xl font-semibold text-white mb-4">Información de Pago</h2>
                  <div className="flex items-center gap-4 p-4 bg-gray-700 rounded-xl mb-4">
                    <CreditCard className="w-6 h-6 text-gray-300" />
                    <span className="font-medium text-white">Tarjeta de Crédito/Débito</span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Número de Tarjeta</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-600 bg-gray-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#cee741] placeholder-gray-400"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Fecha de Expiración</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-gray-600 bg-gray-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#cee741] placeholder-gray-400"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">CVV</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-gray-600 bg-gray-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#cee741] placeholder-gray-400"
                        placeholder="123"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Nombre en la Tarjeta</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-600 bg-gray-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#cee741] placeholder-gray-400"
                      placeholder="NOMBRE APELLIDO"
                    />
                  </div>
                </>
              )}

              <div className="flex gap-4 pt-4">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="flex-1 border border-gray-600 text-gray-300 py-3 rounded-xl font-semibold hover:bg-gray-700 transition-colors"
                  >
                    Atrás
                  </button>
                )}
                <button
                  type="submit"
                  className="flex-1 bg-[#cee741] text-gray-900 py-3 rounded-xl font-semibold hover:bg-[#b5cc1a] transition-all"
                >
                  {step === 3 ? 'Completar Pedido' : 'Continuar'}
                </button>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-2xl shadow-sm p-6 sticky top-24 border border-gray-700">
              <h2 className="text-lg font-semibold text-white mb-4">Resumen del Pedido</h2>
              
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{item.product.name}</p>
                      <p className="text-sm text-gray-400">Cant: {item.quantity}</p>
                      <p className="text-sm font-semibold text-[#cee741]">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-700 pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="font-medium text-white">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Envío</span>
                  <span className="font-medium text-white">
                    {shipping === 0 ? 'Gratis' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Impuestos</span>
                  <span className="font-medium text-white">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t border-gray-700 pt-3">
                  <span className="text-white">Total</span>
                  <span className="text-[#cee741]">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
