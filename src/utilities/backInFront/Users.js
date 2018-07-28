class User {
  constructor(props) {
    const {
      userName,
      firstName,
      secondName,
      gender,
      avatar,
      email,
      role
    } = props;

    this.id = User.counter;
    this.userName = userName;
    this.firstName = firstName;
    this.secondName = secondName;
    this.gender = gender;
    this.avatar = avatar || (gender === 'MALE'
                              ? User.defaultManImage()
                              : User.defaultWomanImage());
    this.email = email;
  }

  static get counter() {
    User._counter = (User._counter || 0) + 1;
    return User._counter;
  }

  static get defaultManImage() {
    return 'img/default-man.png';
  }

  static get defaultWomanImage() {
    return 'img/default-woman.png';
  }
}

export const getDefaultUsers = () => {
  return [{
    userName: 'Lorem',
    firstName: 'Lorem',
    secondName: 'Ipsun',
    gender: 'Male',
    avatar: 'img/default-man.png',
    email: '',
    role: 'front-end developer'
  }, {
    userName: 'blaster',
    firstName: 'Ramona',
    secondName: 'Pierce',
    gender: 'Female',
    avatar: 'img/default-woman.png',
    email: '',
    role: 'front-end developer'
  }, {
    userName: 'Supertester',
    firstName: 'Nelson',
    secondName: 'May',
    gender: 'Male',
    avatar: 'img/default-man.png',
    email: '',
    role: 'tester'
  }, {
    userName: 'smokey_ln',
    firstName: 'Mario',
    secondName: 'Warren',
    gender: 'Male',
    avatar: 'img/default-man.png',
    email: '',
    role: 'team lead'
  }].map(item => new User(item));
}
