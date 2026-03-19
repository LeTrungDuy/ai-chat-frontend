import { Cross2Icon, CheckIcon, StarFilledIcon, RocketIcon } from '@radix-ui/react-icons';

const plans = [
  {
    key: 'plus',
    name: 'Plus',
    icon: StarFilledIcon,
    price: '300.000 ₫',
    period: '/month',
    description: 'Perfect for individuals who want more power',
    color: 'blue',
    features: [
      '100 AI generations per day',
      'Access to all templates',
      'Priority support',
      'Export in HD quality',
      'Remove watermark',
    ],
  },
  {
    key: 'max',
    name: 'Max',
    icon: RocketIcon,
    price: '1.175.000 ₫',
    period: '/month',
    description: 'For power users who need the best',
    color: 'purple',
    popular: true,
    features: [
      'Unlimited AI generations',
      'Access to all templates',
      '24/7 priority support',
      'Export in 4K quality',
      'Remove watermark',
      'Custom branding',
      'Team collaboration',
    ],
  },
];

const PricingModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 md:p-8"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="bg-white rounded-2xl shadow-lg w-full max-w-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-8 py-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Choose your plan</h1>
            <p className="mt-1 text-sm text-gray-500">Upgrade anytime. Cancel anytime.</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100 transition-colors"
            aria-label="Close modal"
          >
            <Cross2Icon className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 gap-4 p-8 sm:grid-cols-2">
          {plans.map((plan) => {
            const PlanIcon = plan.icon;
            const isMax = plan.key === 'max';

            return (
              <div
                key={plan.key}
                className={`relative flex flex-col rounded-xl border-2 p-6 transition-shadow hover:shadow-md ${
                  isMax ? 'border-purple-500 bg-purple-50' : 'border-gray-200 bg-white'
                }`}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-purple-500 px-3 py-1 text-xs font-semibold text-white">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Plan header */}
                <div className="mb-4 flex items-center gap-2">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                      isMax ? 'bg-purple-100' : 'bg-blue-100'
                    }`}
                  >
                    <PlanIcon
                      className={`h-4 w-4 ${isMax ? 'text-purple-600' : 'text-blue-600'}`}
                    />
                  </div>
                  <span className="text-lg font-bold text-gray-900">{plan.name}</span>
                </div>

                {/* Price */}
                <div className="mb-2 flex items-end gap-1">
                  <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                  <span className="mb-1 text-sm text-gray-500">{plan.period}</span>
                </div>

                <p className="mb-6 text-sm text-gray-500">{plan.description}</p>

                {/* CTA */}
                <button
                  className={`mb-6 w-full rounded-lg py-2.5 text-sm font-semibold transition-colors ${
                    isMax
                      ? 'bg-purple-500 text-white hover:bg-purple-600'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  Get {plan.name}
                </button>

                {/* Features */}
                <ul className="flex flex-col gap-2.5">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckIcon
                        className={`h-4 w-4 shrink-0 ${isMax ? 'text-purple-500' : 'text-blue-500'}`}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 bg-gray-50 px-8 py-5 text-center">
          <p className="text-xs text-gray-500">
            All plans include a <span className="font-medium text-gray-700">7-day free trial</span>.
            No credit card required.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PricingModal;
