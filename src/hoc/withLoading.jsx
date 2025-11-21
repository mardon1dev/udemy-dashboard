/**
 * Higher-Order Component (HOC) Pattern
 * Adds loading state to components
 */
export const withLoading = (Component) => {
  return ({ loading, ...props }) => {
    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#509CDB] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      );
    }
    return <Component {...props} />;
  };
};

