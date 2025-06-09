const authorityNumber = {
  ROLE_GUEST: 1,
  ROLE_USER: 2,
  ROLE_ACTIVE_USER: 3,
  ROLE_SEMINAR_WRITER: 4,
  ROLE_ADMIN: 5,
};

export class UserRoleValidator {
  guest(role: string) {
    return this.validationAuthority(role, authorityNumber.ROLE_GUEST);
  }

  user(role: string) {
    return this.validationAuthority(role, authorityNumber.ROLE_USER);
  }

  activeUser(role: string) {
    return this.validationAuthority(role, authorityNumber.ROLE_ACTIVE_USER);
  }

  seminarWriter(role: string) {
    return this.validationAuthority(role, authorityNumber.ROLE_SEMINAR_WRITER);
  }

  admin(role: string) {
    return this.validationAuthority(role, authorityNumber.ROLE_ADMIN);
  }

  private validationAuthority(role: string, authorityNumber: number) {
    if (this.getAuthorityNumber(role) < authorityNumber) {
      return false;
    }

    return true;
  }

  private getAuthorityNumber(role: string) {
    switch (role) {
      case 'ROLE_GUEST':
        return 1;
      case 'ROLE_USER':
        return 2;
      case 'ROLE_ACTIVE_USER':
        return 3;
      case 'ROLE_SEMINAR_WRITER':
        return 4;
      case 'ROLE_ADMIN':
        return 5;
      default:
        return 0;
    }
  }
}
