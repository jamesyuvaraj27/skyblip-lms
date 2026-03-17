import React, { useState } from 'react';
import { useAuth } from '../../context/useAuth.js';

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(() => user);
  const [bio, setBio] = useState(() => user?.bio || '');
  const [name, setName] = useState(() => user?.name || '');
  const [saving, setSaving] = useState(false);

  const saveProfile = async () => {
    setSaving(true);
    try {
      // Local save - no backend call
      const updatedProfile = { ...profile, name, bio };
      setProfile(updatedProfile);
      // Update localStorage
      localStorage.setItem('skyblip_user', JSON.stringify(updatedProfile));
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

