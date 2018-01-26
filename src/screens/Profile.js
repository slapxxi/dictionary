import React from 'react';
import glamorous from 'glamorous';

function Profile() {
  return (
    <Container>
      <h1>Profile</h1>
      <UserInfoContainer>
        <UserPic src="https://avatars1.githubusercontent.com/u/854141?s=400&v=4" />
        <div style={{ flex: 1 }}>
          <UserName>aquanerd</UserName>
          <p>
            A frontend developer located in Saint Petersburg, Russia.
          </p>
        </div>
      </UserInfoContainer>
    </Container>
  );
}

const Container = glamorous.div({
  display: 'flex',
  flexDirection: 'column',
});

const UserInfoContainer = glamorous.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const UserPic = glamorous.img({
  width: 76,
  height: 76,
  marginTop: 20,
  marginBottom: 20,
  backgroundColor: 'tomato',
  borderRadius: '52%',
  border: 0,
  outline: 'none',
  minWidth: 76,
  minHeight: 76,
  marginRight: 20,
});

const UserName = glamorous.h1({
  fontSize: 20,
  color: '#334',
  marginTop: 10,
});

export default Profile;
