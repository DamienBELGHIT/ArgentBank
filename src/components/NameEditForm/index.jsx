import "./index.css"
import { selectLogin, selectProfile } from "../../utils/selectors"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { updateNameProfile } from "../../features/profile"

function NameEditForm() {
  const dispatch = useDispatch()
  const profile = useSelector(selectProfile)
  const profileData = profile.data?.body

  const { token } = useSelector(selectLogin)
  const [isEditName, setEditName] = useState(false)
  const [firstName, setFirstName] = useState(profileData.firstName)
  const [lastName, setLastName] = useState(profileData.lastName)

  return (
    <div>
      {isEditName ? (
        <div className="header">
          <h1>Welcome back</h1>
          <div className="name-inputs">
            <input
              type="text"
              id="firstName"
              placeholder={profileData.firstName}
              onChange={(e) =>
                setFirstName(
                  e.target.value === "" ? profileData.firstName : e.target.value
                )
              }
            />
            <input
              type="text"
              id="lastName"
              placeholder={profileData.lastName}
              onChange={(e) =>
                setLastName(
                  e.target.value === "" ? profileData.lastName : e.target.value
                )
              }
            />
          </div>
          <button
            className="edit-button"
            onClick={() => {
              dispatch(
                updateNameProfile(token, {
                  firstname: firstName,
                  lastname: lastName,
                })
              )
              setEditName(true)
            }}
          >
            Save
          </button>
          <button className="edit-button" onClick={() => setEditName(false)}>
            Cancel
          </button>
        </div>
      ) : (
        <div className="header">
          <h1>
            Welcome back
            <br />
            {profileData.firstName + " " + profileData.lastName} !
          </h1>
          <button className="edit-button" onClick={() => setEditName(true)}>
            Edit Name
          </button>
        </div>
      )}
    </div>
  )
}

export default NameEditForm
