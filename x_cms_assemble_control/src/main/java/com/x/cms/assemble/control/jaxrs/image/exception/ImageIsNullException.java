package com.x.cms.assemble.control.jaxrs.image.exception;

import com.x.base.core.exception.PromptException;

public class ImageIsNullException extends PromptException {

	private static final long serialVersionUID = 1859164370743532895L;

	public ImageIsNullException( String url ) {
		super("系统未能从图片地址URL中获也不能任何图片信息!URL:" + url );
	}
}
