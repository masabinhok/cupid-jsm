import { defaultPic, otherBg } from "@/assets";
import Loading from "@/components/Loading";
import { IUser } from "@/types";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, LogOut, Save } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import ProfilePic from "@/components/your-infos/ProfilePic";
import { useForm } from "@/context/FormContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const Profile = () => {
  const _user = useAuth().user;
  const userId = _user?._id;
  const [user, setUser] = useState<IUser | null>(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [interestError, setInterestError] = useState<string | null>(null);
  const [changeProfile, setChangeProfile] = useState<boolean>(false);
  const { submitForm } = useForm();
  const [logout, setLogout] = useState<boolean>(false);

  const handleSocial = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const input = e.currentTarget.value.trim();

      if (!input) {
        setError("Social link cannot be empty.");
        return;
      }

      if (user?.socialLinks?.includes(input)) {
        setError("Social link already exists.");
        return;
      }

      // Validate URL
      const urlRegex =
        /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(#[-a-z\d_]*)?$/i;

      if (!urlRegex.test(input)) {
        setError("Please enter a valid URL.");
        return;
      }

      // Prepend `https://` if missing
      const formattedLink = input.startsWith("http://www.") || input.startsWith("https://www.")
        ? input
        : `https://www.${input}`;

      // Update formData
      setUser((prev) => prev ? { ...prev, socialLinks: [...(prev.socialLinks || []), formattedLink] } : prev);
      e.currentTarget.value = "";
      setError(null); // Clear error on successful addition
    }
  };

  const { handleLogout } = useAuth();

  const removeSocial = (link: string) => {
    const updatedLinks = user?.socialLinks?.filter((socialLink) => socialLink !== link);
    setUser((prev) => prev ? { ...prev, socialLinks: updatedLinks as string[] } : prev);
  };

  const handleInterest = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const input = (e.currentTarget as HTMLInputElement).value.trim();
      if (!input) {
        setError("Interest cannot be empty");
        return;
      }

      if (user?.interests?.includes(input)) {
        setError("Interest already exists");
        return;
      }

      setUser((prev) =>
        prev ? { ...prev, interests: [...(prev.interests || []), input] } : prev
      );
      (e.currentTarget as HTMLInputElement).value = "";
      setError(null);
      (e.currentTarget as HTMLInputElement).focus();
    }
  };

  const removeInterest = (interestToRemove: string) => {
    const updatedInterests = user?.interests?.filter(
      (interest) => interest !== interestToRemove
    );
    setUser((prev) =>
      prev ? { ...prev, interests: updatedInterests as string[] } : prev
    );
  };

  const handlePreferredInterest = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const input = (e.currentTarget as HTMLInputElement).value.trim();

      if (!input) {
        setInterestError("Interest cannot be empty.");
        return;
      }

      if (user?.preference?.interests?.includes(input)) {
        setInterestError("Interest already exists.");
        return;
      }

      setUser((prev) =>
        prev
          ? {
            ...prev,
            preference: {
              ...prev.preference,
              interests: [...(prev.preference?.interests || []), input],
            },
          }
          : prev
      );
      (e.currentTarget as HTMLInputElement).value = "";
      setInterestError(null);
    }
  };

  const removePreferredInterest = (interestToRemove: string) => {
    const updatedInterests = user?.preference?.interests?.filter(
      (interest) => interest !== interestToRemove
    );
    setUser((prev) =>
      prev
        ? {
          ...prev,
          preference: {
            ...prev.preference,
            interests: updatedInterests as string[],
          },
        }
        : prev
    );
  };

  const updateProfile = async () => {
    try {
      setLoading(true);
      await fetch(`${import.meta.env.VITE_SERVER_URL}/user/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(user),
      })
    }
    catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    try {
      setLoading(true);
      const fetchProfile = async () => {
        await fetch(`${import.meta.env.VITE_SERVER_URL}/user/profile/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setUser(data.user);
          });
      };
      fetchProfile();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  if (loading) {
    return <Loading />;
  }

  return (
    <main
      className="main "
      style={{
        backgroundImage: `url(${otherBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <section className="w-full p-10 flex max-w-[600px] mt-10 ">
        <div className="relative w-full  bg-shade-100/30 rounded-xl flex-center flex-col">
          <button
            onClick={() => navigate("/dashboard")}
            className="absolute -top-12 -left-0 bg-shade-100/50 rounded-full p-1 hover:text-normal tranimate"
          >
            <ArrowLeft />
          </button>
          <button
            onClick={() => updateProfile()}
            className="absolute -top-12 -right-0 bg-shade-100/50 rounded-full p-1 hover:opacity-80 tranimate"
          >
            <Save />
          </button>
          <button
            className="absolute top-5 left-5 bg-romanticRed/90 rounded-full text-softWhite  flex-center  p-2 text-sm hover:opacity-80 tranimate"
          >
            <AlertDialog>
              <AlertDialogTrigger><LogOut className="w-5 " /></AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will end your session and you'll need to authenticate again
                    . Make sure to save any unsaved work before logging out.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction className="bg-romanticRed " onClick={handleLogout} >Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

          </button>

          <img
            onClick={() => setChangeProfile((prev) => !prev)}
            src={user?.profilePicture || defaultPic}
            alt={user?.firstName || "profilePicture"}
            className="aspect-square w-36 object-cover rounded-full border-4 border-shade-500 absolute -top-16"
          />

          {
            changeProfile && (
              <section className="absolute top-0 left-0 w-full  bg-shade-100 rounded-xl flex-center flex-col">
                <span onClick={() => setChangeProfile((prev) => !prev)} className="top-2 right-5 absolute text-3xl font-bold text-romanticRed cursor-pointer">x</span>
                <ProfilePic />
                <button className="px-6 p-1 shadow-sm shadow-normal rounded-sm hover:opacity-80 bg-shade-500/20" onClick={submitForm}>
                  Save
                </button>
              </section>
            )
          }
          <form className="p-10 mt-16">
            <div className="flex gap-3 max-sm:flex-col">
              <label htmlFor="firstName">
                <span className="font-bold">First Name</span>
                <input
                  value={user?.firstName ?? ""}
                  onChange={(e) =>
                    setUser((prev) =>
                      prev ? { ...prev, firstName: e.target.value } : prev
                    )
                  }
                  placeholder="Sabin"
                  type="text"
                  required
                  name="firstName"
                  className="input"
                />
              </label>

              <label htmlFor="middleName">
                <span className="font-bold">Middle Name</span>
                <input
                  value={user?.middleName ?? ""}
                  onChange={(e) =>
                    setUser((prev) =>
                      prev ? { ...prev, middleName: e.target.value } : prev
                    )
                  }
                  placeholder="..."
                  type="text"
                  name="middleName"
                  className="input"
                />
              </label>
              <label htmlFor="lastName">
                <span className="font-bold">Last Name</span>
                <input
                  value={user?.lastName ?? ""}
                  onChange={(e) =>
                    setUser((prev) =>
                      prev ? { ...prev, lastName: e.target.value } : prev
                    )
                  }
                  placeholder="Shrestha"
                  type="text"
                  required
                  name="lastName"
                  className="input"
                />
              </label>
            </div>
            <div className="flex gap-3 max-sm:flex-col">
              <label htmlFor="phone">
                <span className="font-bold">Phone</span>
                <input
                  value={user?.phone ?? ""}
                  onChange={(e) =>
                    setUser((prev) =>
                      prev ? { ...prev, phone: e.target.value } : prev
                    )
                  }
                  placeholder="98419837.."
                  type="phone"
                  name="phone"
                  className="input"
                />
              </label>
              <label htmlFor="dateOfBirth">
                <span className="font-bold">Date Of Birth</span>
                <input
                  value={
                    user?.dateOfBirth
                      ? new Date(user.dateOfBirth).toISOString().split("T")[0] // Convert ISO to yyyy-MM-dd
                      : ""
                  }
                  onChange={(e) =>
                    setUser((prev) =>
                      prev
                        ? { ...prev, dateOfBirth: new Date(e.target.value).toISOString() } // Convert back to ISO
                        : prev
                    )
                  }
                  type="date"
                  name="dateOfBirth"
                  required
                  className="input"
                />
              </label>

            </div>
            <label htmlFor="gender">
              <span className="font-bold">Gender</span>
              <select
                value={user?.gender || ""}
                onChange={(e) =>
                  setUser((prev) =>
                    prev ? { ...prev, gender: e.target.value } : prev
                  )
                }
                name="gender"
                className="input"
                required
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-binary">Non-binary</option>
                <option value="Other">Other</option>
              </select>
            </label>
            <div className="flex gap-3 flex-col w-full">
              {/* Bio Input */}
              <label htmlFor="bio">
                <span className="font-bold">Bio</span>
                <textarea
                  value={user?.bio ?? ""}
                  onChange={(e) =>
                    setUser((prev) =>
                      prev ? { ...prev, bio: e.target.value } : prev
                    )
                  }
                  placeholder="What I do is art..."
                  required
                  name="bio"
                  className="input resize-none h-40 w-full"
                />
              </label>

              {/* Interests Input */}
              <label htmlFor="interests">
                <span className="font-bold">Interests</span>
                <input
                  className="input"
                  type="text"
                  placeholder="Add an interest and press Enter"
                  onKeyDown={handleInterest}
                />
                {error && (
                  <p className="text-alert text-center text-sm">{error}</p>
                )}
                <div className="flex gap-2 flex-wrap">
                  {user?.interests?.map((interest, index) => (
                    <div
                      key={interest + index}
                      className="flex-center w-fit gap-2 bg-softWhite rounded-lg text-sm px-2 py-1 mb-2"
                    >
                      <p>{interest}</p>
                      <button
                        type="button"
                        className="text-red-500 font-bold"
                        onClick={() => removeInterest(interest)}
                      >
                        x
                      </button>
                    </div>
                  ))}
                </div>
              </label>

              <label htmlFor="city" className="w-full">
                <span className="font-bold">City</span>
                <input
                  type="text"
                  id="city"
                  name="city"
                  placeholder="Enter your city"
                  value={user?.location?.city || ""}
                  onChange={(e) =>
                    setUser((prev) =>
                      prev
                        ? {
                          ...prev,
                          location: { ...prev.location, city: e.target.value },
                        }
                        : prev
                    )
                  }
                  className="input"
                />
              </label>

              <label htmlFor="country" className="w-full">
                <span className="font-bold">Country</span>
                <input
                  type="text"
                  id="country"
                  name="country"
                  placeholder="Enter your country"
                  value={user?.location?.country || ""}
                  onChange={(e) =>
                    setUser((prev) =>
                      prev
                        ? {
                          ...prev,
                          location: {
                            ...prev.location,
                            country: e.target.value,
                          },
                        }
                        : prev
                    )
                  }
                  className="input"
                />
              </label>
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
            <div className="flex gap-3 max-sm:flex-col">
              <label htmlFor="preferenceDistance">
                <span className="font-bold">MaxDistance (km)</span>
                <input
                  value={user?.preference?.maxDistance ?? ""}
                  onChange={(e) =>
                    setUser((prev) =>
                      prev
                        ? {
                          ...prev,
                          preference: {
                            ...prev.preference,
                            maxDistance: Number(e.target.value),
                          },
                        }
                        : prev
                    )
                  }
                  type="number"
                  min="0"
                  placeholder="50"
                  className="input"
                />
              </label>
              <label htmlFor="ageRangeMin">
                <span className="font-bold">Min Age</span>
                <input
                  type="number"
                  value={user?.preference?.ageRange?.min ?? ""}
                  onChange={(e) =>
                    setUser((prev) =>
                      prev
                        ? {
                          ...prev,
                          preference: {
                            ...prev.preference,
                            ageRange: {
                              min: e.target.value ? Number(e.target.value) : null,
                              max: prev.preference?.ageRange?.max ?? null,
                            },
                          },
                        }
                        : prev
                    )
                  }
                  placeholder="18"
                  className="input"
                />
              </label>
              <label htmlFor="maxAge">
                <span className="font-bold">Max Age</span>
                <input
                  value={user?.preference?.ageRange?.max ?? ""}
                  onChange={(e) =>
                    setUser((prev) =>
                      prev
                        ? {
                          ...prev,
                          preference: {
                            ...prev.preference,
                            ageRange: {
                              min: prev.preference?.ageRange?.min ?? null,
                              max: e.target.value ? Number(e.target.value) : null,
                            },
                          },
                        }
                        : prev
                    )
                  }
                  type="number"
                  placeholder="99"
                  className="input"
                />
              </label>
            </div>

            <label htmlFor="preferenceGender">
              <span className="font-bold">Preferred Gender</span>
              <select
                value={user?.preference?.gender ?? ""}
                onChange={(e) =>
                  setUser((prev) =>
                    prev
                      ? {
                        ...prev,
                        preference: {
                          ...prev.preference,
                          gender: e.target.value,
                        },
                      }
                      : prev
                  )
                }
                className="input"
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-binary">Non-binary</option>
                <option value="Other">Other</option>
              </select>
            </label>
            <label htmlFor="preferenceInterest">
              <span className="font-bold">Preferred Interest</span>
              <input
                id="preferenceInterest"
                className="input"
                type="text"
                placeholder="Add an interest and press Enter"
                onKeyDown={handlePreferredInterest}
              />
              {interestError && (
                <p className="text-alert text-sm">{interestError}</p>
              )}
              <div className="flex gap-2 flex-wrap mb-2">
                {user?.preference?.interests?.map((interest, index) => (
                  <div
                    key={interest + index}
                    className="flex items-center gap-2 bg-softWhite text-sm rounded-lg px-2 py-1"
                  >
                    <p>{interest}</p>
                    <button
                      type="button"
                      className="text-red-500 font-bold"
                      onClick={() => removePreferredInterest(interest)}
                    >
                      x
                    </button>
                  </div>
                ))}
              </div>
            </label>


            <label htmlFor="socialLinks" className="w-full">
              <span className="font-bold">Add a Social Link (optional)</span>
              <input
                id="socialLinks"
                className="input w-full"
                type="text"
                placeholder="Add a social link and press Enter"
                onKeyDown={handleSocial}
                onChange={() => setError(null)} // Clear error on typing
              />
              {error && <p className="text-alert text-sm mt-1">{error}</p>}
            </label>
            <div className="mt-3 flex gap-2 flex-wrap">
              {user?.socialLinks?.map((link, index) => (
                <div
                  key={`${link}-${index}`}
                  className="flex items-center gap-2 bg-softWhite rounded-lg px-2 py-1 mb-2"
                >
                  <p key={index} className="w-fit  font-bold inline ">
                    <Link className="text-shade-500  w-fit uppercase text-sm" to={link} target="_blank">
                      {link.toString().split('.')[1]}
                    </Link>
                  </p>
                  <button
                    type="button"
                    className="text-red-500 font-bold"
                    onClick={() => removeSocial(link)}
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
          </form>
        </div>
      </section>
    </main >
  );
};

export default Profile;
