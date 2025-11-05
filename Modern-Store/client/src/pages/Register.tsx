export default function Register() {

   
          return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      <form
        // onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-sm border border-gray-100"
      >
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
          Welcome  👋
        </h2>
       

        {/* {error && (
          <p className="text-red-500 text-sm mb-3 bg-red-50 p-2 rounded-lg text-center">
            {error}
          </p>
        )} */}

         <div className="mb-5">
          <label className="block text-gray-700 mb-2 text-sm">Username</label>
          <input
            type="text"
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
          />
        </div>

        <div className="mb-5">
          <label className="block text-gray-700 mb-2 text-sm">Email</label>
          <input
            type="email"
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2 text-sm">Password</label>
          <input
            type="password"
            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
          />
        </div>

          <div className="mb-6">
          <label className="block text-gray-700 mb-2 text-sm">Confirm Password</label>
          <input
            type="password"
            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
          />
        </div>

        <button
          type="submit"
        //   disabled={loading}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-semibold py-2.5 rounded-lg shadow-sm transition duration-150"
        >
          {/* {loading ? "Signing in..." : "Sign In"} */}
        </button>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{" "}
          <a href="/register" className="text-orange-500 hover:underline">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
}