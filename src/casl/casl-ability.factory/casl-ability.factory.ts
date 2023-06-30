import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { Action } from '../Action';
import { ROLES } from 'src/auth/decorator/allowed-roles.decorator';

type Subjects = InferSubjects<typeof User> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    const isAdmin = user.roles.some(
      (userRoles) => userRoles.id === ROLES.ADMIN,
    );

    if (isAdmin) {
      can(Action.Manage, 'all');
    } else {
      can(Action.Read, User, { id: user.id });
      can(Action.Update, User, { id: user.id });
      cannot(Action.Delete, User).because('You cannot delete account(s)!');
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
