import PropTypes from 'prop-types'

const SignInModal = ({ showModal, onClose, onSelect }) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-lg font-bold mb-4">Sign In As</h2>
        <button
          className="btn btn-primary w-full mb-2"
          onClick={() => onSelect('user')}
        >
          User
        </button>
        <button
          className="btn btn-primary w-full mb-2"
          onClick={() => onSelect('agent')}
        >
          Agent
        </button>
        <button className="btn btn-secondary w-full mt-4" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

SignInModal.propTypes = {
    showModal: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
};

export default SignInModal;
