# 【JAVA基础】注解

## 1 什么是注解？

继承Annotation接口的接口。

- 本身没有任何含义，就是一个标记。
- 关键在于**目的**（标注注解的目的）--->**行为**（与之匹配的行为）

### 1.1 注解的样例

```java
    @Target({ElementType.METHOD, ElementType.TYPE, ElementType.FIELD})
    @Retention(RetentionPolicy.RUNTIME)
    @Documented
    @interface TestAnnotation {

        int num() default 0;

        String name() default "";
    }
```

反编译后

```java
// Decompiled by Jad v1.5.8e2. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://kpdus.tripod.com/jad.html
// Decompiler options: packimports(3) fieldsfirst ansi space 
// Source File Name:   Testjava.java

package annotion;

import java.lang.annotation.Annotation;

// Referenced classes of package annotion:
//			Testjava

static interface Testjava$TestAnno
	extends Annotation
{

	public abstract int num();

	public abstract String name();
}
```



## 2 获取各种类型上标注的注解

通过jdk动态代理的对象调用的方法
