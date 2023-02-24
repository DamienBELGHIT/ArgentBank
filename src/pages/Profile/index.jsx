import "./index.css"
import Account from "../../components/Account"
import Loader from "../../components/Loader"
import NameEditForm from "../../components/NameEditForm"
import { selectLogin, selectProfile } from "../../utils/selectors"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchProfile } from "../../features/profile"

function Profile() {
  const dispatch = useDispatch()
  const profile = useSelector(selectProfile)
  const { token } = useSelector(selectLogin)

  const isLoading =
    profile.status === "void" ||
    profile.status === "pending" ||
    profile.status === "updating"

  useEffect(() => {
    dispatch(fetchProfile(token))
  }, [dispatch, token])

  if (profile.status === "rejected") {
    return <span>{profile.error.toString()}</span>
  }

  return (
    <main className="main bg-dark">
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <NameEditForm />
          <h2 className="sr-only">Accounts</h2>
          <Account
            title="Argent Bank Checking (x8349)"
            amount="$2,082.79"
            description="Available Balance"
          />
          <Account
            title="Argent Bank Savings (x6712)"
            amount="$10,928.42"
            description="Available Balance"
          />
          <Account
            title="Argent Bank Credit Card (x8349)"
            amount="$184.30"
            description="Current Balance"
          />
        </div>
      )}
    </main>
  )
}

export default Profile
