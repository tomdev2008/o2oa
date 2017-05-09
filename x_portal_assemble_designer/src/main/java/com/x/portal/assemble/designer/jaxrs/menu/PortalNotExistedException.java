package com.x.portal.assemble.designer.jaxrs.menu;

import com.x.base.core.exception.PromptException;

class PortalNotExistedException extends PromptException {

	private static final long serialVersionUID = -9089355008820123519L;

	PortalNotExistedException(String id) {
		super("portal: {} not existed.", id);
	}
}