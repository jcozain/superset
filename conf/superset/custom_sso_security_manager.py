import logging

from superset.security import SupersetSecurityManager



class CustomSsoSecurityManager(SupersetSecurityManager):

    def oauth_user_info(self, provider, response=None):

        me = self.appbuilder.sm.oauth_remotes[provider].get('userinfo').json()
        return { 'name' : me['name'], 'email' : me['email'], 'id' : me['id'], 'username' : me['name'], 'first_name':me['given_name'], 'last_name':me['family_name']}