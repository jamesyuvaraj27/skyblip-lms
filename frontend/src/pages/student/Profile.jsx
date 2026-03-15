import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';

const Profile = () => {
  const { token, apiBase, user } = useAuth();
  const [profile, setProfile] = useState(user);
  const [bio, setBio] = useState(user?.bio || '');
  const [name, setName] = useState(user?.name || '');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchMe = async () => {
      const res = await fetch(`${apiBase}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setProfile(data);
      setName(data.name);
      setBio(data.bio || '');
    };
    if (token) fetchMe();
  }, [apiBase, token]);

  const saveProfile = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${apiBase}/api/student/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ name, bio })
      });
      const data = await res.json();
      setProfile(data);
    } finally {
      setSaving(false);
    }
  };

  if (!profile) return <div>Loading profile...</div>;

  return (
    <div className="profile-page">
      <h2>Profile</h2>
      <p className="muted">
        Your learner identity across courses, problems and quizzes. This is what instructors will
        see in a full build.
      </p>

      <div className="profile-layout">
        <div className="card profile-card">
          <label>
            Name
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </label>

          <label>
            Bio
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Eg. MERN learner focusing on DSA and system design."
            />
          </label>

          <button className="btn btn--primary btn--small" onClick={saveProfile} disabled={saving}>
            {saving ? 'Saving...' : 'Save changes'}
          </button>
        </div>

        <div className="card profile-summary">
          <h3>Public snapshot</h3>
          <p className="muted">
            This card demonstrates how your profile could be rendered on leaderboards or course
            discussions.
          </p>
          <div className="profile-avatar">{profile.name?.charAt(0) || 'S'}</div>
          <p className="profile-name">{profile.name}</p>
          <p className="profile-email">{profile.email}</p>
          <p className="muted">{profile.bio || 'No bio added yet.'}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;

