// @flow
import {makeRouteDefNode, makeLeafTags} from '../route-tree'
import {isMobile} from '../constants/platform'

const profileRoute = () => {
  const pgpRoutes = require('./pgp/routes').default
  const Profile = require('./user/container').default
  const AddToTeam = require('./add-to-team/container').default
  const EditProfile2 = require('./edit-profile2/container').default
  const EditAvatar = require('./edit-avatar/container').default
  const ProveEnterUsername = require('./prove-enter-username/container').default
  const ProveWebsiteChoice = require('./prove-website-choice/container').default
  const RevokeContainer = require('./revoke/container').default
  const PostProof = require('./post-proof/container').default
  const ConfirmOrPending = require('./confirm-or-pending/container').default
  const SearchPopup = require('./search/container').default
  const NonUserProfile = require('./non-user-profile/container').default
  const ShowcaseTeamOffer = require('./showcase-team-offer/container').default
  const ControlledRolePicker = require('../teams/role-picker/controlled-container').default
  const WalletConstants = require('../constants/wallets')

  const SendRequestFormRoutes = require('../wallets/routes-send-request-form').default()

  const proveEnterUsername = makeRouteDefNode({
    children: {
      confirmOrPending: {
        component: ConfirmOrPending,
      },
      postProof: {
        children: {
          confirmOrPending: {
            component: ConfirmOrPending,
          },
        },
        component: PostProof,
      },
    },
    component: ProveEnterUsername,
  })

  return makeRouteDefNode({
    children: {
      addToTeam: {
        children: {
          controlledRolePicker: {
            children: {},
            component: ControlledRolePicker,
            tags: makeLeafTags({fullscreen: isMobile, layerOnTop: !isMobile}),
          },
        },
        component: AddToTeam,
        tags: makeLeafTags({fullscreen: isMobile, layerOnTop: !isMobile}),
      },
      profile: profileRoute,
      profileEdit: {
        component: EditProfile2,
        tags: makeLeafTags({layerOnTop: !isMobile, renderTopmostOnly: true}),
      },
      profileEditAvatar: {
        component: EditAvatar,
        tags: makeLeafTags({layerOnTop: !isMobile}),
      },
      profileNonUser: {
        children: {
          profile: profileRoute,
        },
        component: NonUserProfile,
      },
      profilePgp: pgpRoutes,
      profileProveEnterUsername: proveEnterUsername,
      profileProveWebsiteChoice: {
        children: {
          proveEnterUsername,
        },
        component: ProveWebsiteChoice,
      },
      profileRevoke: {
        component: RevokeContainer,
      },
      profileSearch: {
        children: {},
        component: SearchPopup,
        tags: makeLeafTags({layerOnTop: !isMobile}),
      },
      profileShowcaseTeamOffer: {
        children: {},
        component: ShowcaseTeamOffer,
        tags: makeLeafTags({layerOnTop: !isMobile}),
      },
      [WalletConstants.sendRequestFormRouteKey]: SendRequestFormRoutes,
    },
    component: Profile,
    initialState: {currentFriendshipsTab: 'Followers'},
    tags: makeLeafTags({title: 'Profile', underNotch: true}),
  })
}

export const newRoutes = {
  profile: {getScreen: () => require('./user/container').default, upgraded: true},
  profileAddToTeam: {getScreen: () => require('./add-to-team/container').default},
  profileConfirmOrPending: {getScreen: () => require('./confirm-or-pending/container').default},
  profileEditAvatar: {getScreen: () => require('./edit-avatar/container').default},
  profileNonUser: {getScreen: () => require('./non-user-profile/container').default},
  profilePostProof: {getScreen: () => require('./post-proof/container').default},
  profileProveEnterUsername: {getScreen: () => require('./prove-enter-username/container').default},
  profileProveWebsiteChoice: {getScreen: () => require('./prove-website-choice/container').default},
  profileShowcaseTeamOffer: {getScreen: () => require('./showcase-team-offer/container').default},
}

export const newModalRoutes = {
  profileEdit: {getScreen: () => require('./edit-profile2/container').default},
  profileRevoke: {getScreen: () => require('./revoke/container').default},
  profileSearch: {getScreen: () => require('./search/container').default},
  ...require('./pgp/routes').newRoutes,
}

export default profileRoute
